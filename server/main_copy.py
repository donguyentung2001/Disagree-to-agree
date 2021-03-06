# web framework
from flask import Flask, render_template, request, session, redirect, url_for
from flask.wrappers import Response
from werkzeug.security import generate_password_hash, check_password_hash
from flask_socketio import SocketIO, send

# database
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import datetime

# utilities
import json
from flask.json import jsonify
import random
import time
from profile_analysis import sentiment_analysis
from matching import matching_algo
import bot_questions as bot_questions 

#app setup
app = Flask(__name__)
app.secret_key = 'development key'

# database set up
cred = credentials.Certificate("database/firebase_key.json")

firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://disagree-to-agree.firebaseio.com'
})

db = db.reference('')
users_db = db.child('users')
chat_db = db.child('chat')
match_db = db.child("matchmaking")

# chat (socket.io) setup
socketio=SocketIO(app)

@app.route('/', methods = ["GET", "POST"])
def homepage():
    if "unmatch" in session:
        unmatch = session['unmatch']
    else:
        unmatch = ""
    session['unmatch'] = ''
    if session.get("user"):
        return render_template('signedHome.html', user = session["user"], avatar = session["user_avatar"], flash = unmatch)
    else:
       return render_template('home.html', flash = unmatch)

@app.route('/matchmaking', methods = ["GET", "POST"])
def matchmaking():
    avail_user = match_db.get()
    waiting_already = False
    if avail_user != None:
        for uid, user_profile in avail_user.items():
            if str(session["user_email"]) == str(list(user_profile.keys())[0]):
                waiting_already = True
    if avail_user != None and not waiting_already:
        compatible_user = matching_algo.match_users([session["user_email"], users_db.order_by_child('email').equal_to(session['user_email']).limit_to_first(1).get().items()], [v for k, v in avail_user.items()])
        # compatible user is the email for the other user
        if compatible_user is not None:
            chatID = session["user_email"] + compatible_user
            session["chatID"] = chatID
            compatible_user_node = [v for k,v in match_db.get().items() if v['email'] == compatible_user][0]
            match_db.child(compatible_user_node['match_key']).set({'matched': chatID})
            return redirect("/chat")
        else:
            user_details = users_db.order_by_child('email').equal_to(session['user_email']).limit_to_first(1).get().items()
            for _, details in user_details:
                user_profile = details
            waiting_match_key = match_db.push().key
            match_db.child(waiting_match_key).set({"email":session["user_email"], "matched": False, "details": user_profile, 'match_key': waiting_match_key})
            matched = False
            while True:
                user_match_update = match_db.get(waiting_match_key)[0][waiting_match_key]
                if user_match_update["matched"] != False: # matched
                    match_db.child(waiting_match_key).delete()
                    chatID = user_match_update["matched"]
                    session["chatID"] = chatID
                    matched = True
                if matched == True:
                    break
                else:
                    continue
    else:
        user_details = users_db.order_by_child('email').equal_to(session['user_email']).limit_to_first(1).get().items()
        for _, details in user_details:
            user_profile = details
        waiting_match_key = match_db.push().key
        match_db.child(waiting_match_key).set({"email":session["user_email"], "matched": False, "details": user_profile, 'match_key': waiting_match_key})
        matched = False
        while True:
            user_match_update = match_db.get(waiting_match_key)[0][waiting_match_key]
            if user_match_update["matched"] != False: # matched
                match_db.child(waiting_match_key).delete()
                chatID = user_match_update["matched"]
                session["chatID"] = chatID
                matched = True
            if matched == True:
                break
            else:
                continue

    return redirect("/chat")

@app.route('/chat', methods = ["GET"])
def redirect_to_chat():
    if "chatID" in session and session["chatID"] != None:
        chatID = session["chatID"]
        session['random-number']=len(chatID)
        return redirect("/chat/" + str(chatID))
    else:
        return redirect("/matchmaking")

@app.route('/chat/<chatID>', methods = ["GET", "POST"])
def chat(chatID):
    other_email=chatID.replace(session["user_email"],'')
    other_username=users_db.order_by_child('email').equal_to(other_email).get().items()
    for _, user in other_username:
        otherusername=user['username']

    chat_ID=chat_db.child(chatID)
    if request.method == "POST":
        if request.json['msg'] == "!exit":
            session['unmatch']='You have been unmatched'
            session.pop('chatID', None)
            chat_db.child(chatID).delete()
            return "OK"
        else:
            time=datetime.datetime.now().timestamp() * 1000
            username= session["user"]
            msg=request.json['msg']
            chat_ID.push({'time':time,'username': username,'message': msg})
            return "OK"
    else:
        if str(chatID) != session["chatID"]:
            return "You do not have permission. Please return"
        else:
            return render_template("chat.html",user=session['user'], chatID = chatID, otherusername=otherusername)

@app.route('/chat/log/<chatID>', methods = ["GET", "POST"])
def chat_log(chatID): 
    chat_ID=chat_db.child(chatID)
    message="" 
    messages_content=chat_ID.order_by_child('time').limit_to_last(10).get()
    if messages_content != None:
        for message_content in messages_content: 
            message_content=chat_ID.child(message_content)
            message+= message_content.child("username").get()
            message+= ": "
            message+= message_content.child("message").get()
            message+= "\n" 
    return message

@socketio.on('message')
def handle_message(msg): 
    send(msg,broadcast=True)

@app.route('/register', methods = ["GET", "POST"])
def register():
    if request.method == "POST":
        _username = request.form["username"]
        _email = request.form["email"]
        _password = request.form["password"]
        _party = request.form["party"]
        _avatar = request.form["avatar"]
        _interest = request.form["interest"]
        _interest = _interest.split(",")
        _message = []
        _message_polarity = []
        _message_subjectivity = []
        for key in request.form.keys():
            if key[0:7] == "message":
                _message.append(request.form[key])
                _message_polarity.append(sentiment_analysis.analyze_google_sentiment(request.form[key]))
                _message_subjectivity.append(sentiment_analysis.find_sentiments(request.form[key]))
        if _password:
            _hashed_password = generate_password_hash(_password)
        user = users_db.order_by_child('email').equal_to(_email).get().items()
        if len(user) >= 1:
            return render_template("register.html", message = "This user email already existed. Please enter a different email.")
        user = users_db.order_by_child('username').equal_to(_username).get().items()
        if len(user) >= 1:
            return render_template("register.html", message = "This username already existed. Please enter a different username.")        

        users_db.push({"username": _username, "email": _email, "password": _hashed_password, "party": _party, "interest": _interest, "messages": _message, "messages-polarity": _message_polarity, "messages-subjectivity": _message_subjectivity, "avatar": _avatar})
        return render_template("signin.html", message = "Thank you for registering. Sign in to join us now!")
    else:
        return render_template("register.html")

@app.route('/signin', methods = ["GET", "POST"])
def signin():
    if request.method == "POST":
        _email = request.form["email"]
        _password = request.form["password"]
        user = users_db.order_by_child('email').equal_to(_email).get().items()
        if len(user) > 1:
            return "Internal Database Error (more than one user detected)"
        else:
            for _, user in user:
                if check_password_hash(user["password"], _password):
                    session["user"] = user["username"]
                    session["user_email"] = user["email"]
                    session["user_avatar"] = user["avatar"]
                    return render_template("complete.html", user = session["user"])
                else:
                    return render_template("signin.html", message = "Wrong password")
            else:
                return render_template("signin.html", message = "Email doesn't exist")
    else:
        return render_template("signin.html")

@app.route('/logout')
def logout():
    # delete user from matchmaking database
    matchmaking_instances = dict(match_db.order_by_child('email').equal_to(session["user_email"]).get().items())
    matchmaking_instances = list(matchmaking_instances.keys())
    for key in matchmaking_instances:
        match_db.child(key).delete()
    session.pop('user', None)
    session.pop('chatID', None)
    session.pop('user_avatar', None)
    session.pop('user_email', None)
    if 'credentials' in session:
        del session['credentials']
    return redirect('/')

@app.route('/bot_casual',methods=["GET"]) 
def bot_casual(): 
    session['random-number']+=1
    return bot_questions.casual[session['random-number']%(len(bot_questions.casual)-1)]

@app.route('/bot_immigration',methods=["GET"]) 
def bot_immigration(): 
    session['random-number']+=1
    return bot_questions.immigration[session['random-number']%(len(bot_questions.immigration)-1)]

@app.route('/bot_economics',methods=["GET"]) 
def bot_economics():  
    session['random-number']+=1
    return bot_questions.economics[session['random-number']%(len(bot_questions.economics)-1)]

@app.route('/bot_healthcare',methods=["GET"]) 
def bot_healthcare():  
    session['random-number']+=1
    return bot_questions.healthcare[session['random-number']%(len(bot_questions.healthcare)-1)]

@app.route('/bot_education',methods=["GET"]) 
def bot_education():  
    session['random-number']+=1
    return bot_questions.education[session['random-number']%(len(bot_questions.education)-1)]

if __name__ == "__main__":
    socketio.run(app)
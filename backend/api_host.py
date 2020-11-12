# web framework
from flask import Flask, render_template, request, session, redirect, url_for, Response
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
import bot_questions as bot_questions 
from flask.json import jsonify
import random
import time
from profile_analysis import sentiment_analysis
from matching import matching_algo

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

# api routes

# if the user is loggedin
@app.route('/loggedin', methods = ["GET"])
def loggedIn():
    if session.get("user"):
        return Response(str(dict(session)), status=200, mimetype='application/json')
    else:
        return Response("{'logged_in' = 'False'}", status=200, mimetype='application/json')

# logging the user out
@app.route('/logout', methods = ["POST"])
def logout():
    try:
        # delete user from matchmaking database
        matchmaking_instances = dict(match_db.order_by_child('email').equal_to(session["user_email"]).get().items())
        matchmaking_instances = list(matchmaking_instances.keys())
        for key in matchmaking_instances:
            match_db.child(key).delete()

        session.pop('user', None)
        session.pop('chatID', None)
        session.pop('user_avatar', None)
        session.pop('user_email', None)
        session.pop("logged_in", None)
        if 'credentials' in session:
            del session['credentials']
        return Response("Success", status=200, mimetype='application/json')

    except Exception as e:
        print(e)
        return Response(str(e), status=500, mimetype='application/json')

#sign the user in
@app.route('/login', methods = ["POST"])
def signin():
    try:
        if request.method == "POST":
            _email = request.form["email"]
            _password = request.form["password"]
            user = users_db.order_by_child('email').equal_to(_email).get().items()
            if len(user) > 1:
                return Response("{'error':'Internal Database Error (more than one user detected). Contact Trung so he can delete the record from the database.'}", status=500, mimetype='application/json')
            else:
                for _, user in user:
                    if check_password_hash(user["password"], _password):
                        session["user"] = user["username"]
                        session["user_email"] = user["email"]
                        session["user_avatar"] = user["avatar"]
                        session["logged_in"] = True
                        return Response(str(dict(session)), status=200, mimetype='application/json')
                    else:
                        return Response("{'error':'Wrong password'}", status=401, mimetype='application/json')
                else:
                    return Response("{'error':'Email doesn't exist'}", status=404, mimetype='application/json')
    
    except Exception as e:
        print(e)
        return Response(str(e), status=500, mimetype='application/json')

# registering the user
@app.route('/register', methods = ["POST"])
def register():
    try:
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
            return Response("{'error':'Email existed'}", status=409, mimetype='application/json')
        user = users_db.order_by_child('username').equal_to(_username).get().items()
        if len(user) >= 1:
            return Response("{'error':'Username existed'}", status=409, mimetype='application/json')      

        users_db.push({"username": _username, "email": _email, "password": _hashed_password, "party": _party, "interest": _interest, "messages": _message, "messages-polarity": _message_polarity, "messages-subjectivity": _message_subjectivity, "avatar": _avatar})
        return Response("Success", status=200, mimetype='application/json')
    
    except Exception as e:
        print(e)
        return Response(str(e), status=500, mimetype='application/json')

# return chat ID
@app.route('/get_chatid', methods = ["GET"])
def redirect_to_chat():
    if "chatID" in session and session["chatID"] != None:
        chatID = session["chatID"]
        return Response("{'chatID':'{}'}".format(chatID), status=200, mimetype='application/json')
    else:
        return Response("{'error':'User not yet matched. Please run /matchmaking so that they can be matched.'}", status=401, mimetype='application/json')

#return chat history
@app.route('/chat/log/<chatID>', methods = ["GET"])
def chat_log(chatID):
    try:
        chat_ID=chat_db.child(chatID)
        message="" 
        messages_content=chat_ID.order_by_child('time').limit_to_last(10).get()
        final_messages = []
        if messages_content != None:
            for message_content in messages_content: 
                message_content=chat_ID.child(message_content)
                user = message_content.child("username").get()
                message = message_content.child("message").get()
                final_messages.append({"user": user, "message": message})
        return Response("{}".format(final_messages), status=200, mimetype='application/json')
    
    except Exception as e:
        print(e)
        return Response(str(e), status=500, mimetype='application/json')

# post chat messages to DB
@app.route('/chat/<chatID>', methods = ["POST"])
def chat(chatID):
    try:
        chat_ID=chat_db.child(chatID)
    except:
        return Response("{'error':'chatID not in database'}", status=404, mimetype='application/json')
    
    try:
        if request.json['msg'] == "!exit":
            session['unmatch']='You have been unmatched'
            session.pop('chatID', None)
            chat_db.child(chatID).delete()
            return Response("Success", status=200, mimetype='application/json')
        else:
            time=datetime.datetime.now().timestamp() * 1000
            username= session["user"]
            msg=request.json['msg']
            chat_ID.push({'time':time,'username': username,'message': msg})
            return Response("Success", status=200, mimetype='application/json')

    except Exception as e:
        print(e)
        return Response(str(e), status=500, mimetype='application/json')

@socketio.on('message')
def handle_message(msg): 
    send(msg,broadcast=True)

@app.route('/matchmaking', methods = ["POST"])
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
            return Response(str(dict(session)), status=200, mimetype='application/json')

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

    return Response(str(dict(session)), status=200, mimetype='application/json')

@app.route('/get_profile', methods = ["GET"])
def get_profile():
    try:
        if session.get("user"):
            db_users = users_db.order_by_child('username').equal_to(session.get("user")).get().items()
            users = []
            for k, v in db_users:
                users.append(v)
            return Response("{}".format(users), status=200, mimetype='application/json')
        else:
            return Response("{'error':'Not signed in'}", status=401, mimetype='application/json')
    
    except Exception as e:
        print(e)
        return Response(str(e), status=500, mimetype='application/json')

@app.route('/bot_casual',methods=["GET","POST"]) 
def bot_casual(): 
    try: 
        session['random-number']+=1
        return Response("{'question':'{}'}".format(bot_questions.casual[session['random-number']%(len(bot_questions.casual)-1)]), status=200, mimetype='application/json')
    except Exception as e: 
        print(e)
        return Response(str(e),status=500, mimetype='application/json')

@app.route('/bot_immigration',methods=["GET","POST"]) 
def bot_immigration(): 
    try: 
        session['random-number']+=1
        return Response("{'question':'{}'}".format(bot_questions.immigration[session['random-number']%(len(bot_questions.immigration)-1)]), status=200, mimetype='application/json')
    except Exception as e: 
        print(e)
        return Response(str(e),status=500, mimetype='application/json')

@app.route('/bot_economics',methods=["GET","POST"]) 
def bot_economics():  
    try:
        session['random-number']+=1
        return Response("{'question':'{}'}".format(bot_questions.economics[session['random-number']%(len(bot_questions.economics)-1)]), status=200, mimetype='application/json')
    except Exception as e: 
        print(e)
        return Response(str(e),status=500, mimetype='application/json')


@app.route('/bot_healthcare',methods=["GET","POST"]) 
def bot_healthcare():  
    try:
        session['random-number']+=1
        return Response("{'question':'{}'}".format(bot_questions.healthcare[session['random-number']%(len(bot_questions.healthcare)-1)]), status=200, mimetype='application/json')
    except Exception as e: 
        print(e)
        return Response(str(e),status=500, mimetype='application/json')

@app.route('/bot_education',methods=["GET","POST"]) 
def bot_education():  
    try:
        session['random-number']+=1
        return Response("{'question':'{}'}".format(bot_questions.education[session['random-number']%(len(bot_questions.education)-1)]), status=200, mimetype='application/json')
    except Exception as e: 
        print(e)
        return Response(str(e),status=500, mimetype='application/json')
if __name__ == "__main__":
    socketio.run(app)
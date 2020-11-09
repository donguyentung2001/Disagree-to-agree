# web framework
from flask import Flask, render_template, request, session, redirect, url_for
from werkzeug.security import generate_password_hash, check_password_hash
from flask_socketio import SocketIO, send

# database
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

cred = credentials.Certificate("database/firebase_key.json")

firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://disagree-to-agree.firebaseio.com'
})

ref = db.reference('')
users_ref = ref.child('users')
chat_ref = ref.child('chat')

# utilities
import json

app = Flask(__name__)
app.secret_key = 'development key'

socketio=SocketIO(app)

@app.route('/', methods = ["GET", "POST"])
def homepage():
    if session.get("user"):
        return render_template('signedHome.html', user = session["user"])
    else:
        if "data" in session:
            data= session['data']
        else:
            data = ""
        session['data'] = ''
        return render_template('home.html', flash=data)

@app.route('/chat', methods = ["GET", "POST"])
def chat(): 
    if request.method == "POST":
        session['data']='You are unmatched'
    return render_template("chat.html")
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
        _interest = []
        for key in request.form.keys():
            if key[0:8] == "interest":
                _interest.append(request.form[key])
        if _password:
            _hashed_password = generate_password_hash(_password)
        user = users_ref.order_by_child('email').equal_to(_email).get()
        if len(user) >= 1:
            return render_template("register.html", message = "This user already existed. Please enter a different email.")
        users_ref.push({"username": _username, "email": _email, "password": _hashed_password, "party": _party, "interest": _interest})
        return render_template("signin.html", message = "Thank you for registering. Sign in to join us now!")
    else:
        return render_template("register.html")

@app.route('/signin', methods = ["GET", "POST"])
def signin():
    if request.method == "POST":
        _email = request.form["email"]
        _password = request.form["password"]
        user = users_ref.order_by_child('email').equal_to(_email).get().items()
        if len(user) > 1:
            return "Internal Database Error (more than one user detected)"
        else:
            for _, user in user:
                if check_password_hash(user["password"], _password):
                    session["user"] = user["username"]
                    session["user_email"] = user["email"]
                    return render_template("complete.html", user = session["user"])
                else:
                    return render_template("signin.html", message = "Wrong password")
            else:
                return render_template("signin.html", message = "Email doesn't exist")
            
    else:
        return render_template("signin.html")

@app.route('/logout')
def logout():
    session.pop('user', None)
    if 'credentials' in session:
        del session['credentials']
    return redirect('/')

if __name__ == "__main__":
    socketio.run(app)
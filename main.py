from flask import Flask, render_template, request, session, redirect, url_for
from werkzeug.security import generate_password_hash, check_password_hash
import pyrebase
from flask_socketio import SocketIO, send
from database.firebase_config import firebase_config
import json 
firebase = pyrebase.initialize_app(firebase_config)

db = firebase.database()

app = Flask(__name__)

socketio=SocketIO(app)

@app.route('/', methods = ["GET", "POST"])
def homepage():
    if session["data"]:
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
        _email = request.form["email"]
        _password = request.form["password"]
        _party = request.form["party"]
        _interest = []
        for key in request.form.keys():
            if key[0:8] == "interest":
                _interest.append(request.form[key])
        if _password:
            _hashed_password = generate_password_hash(_password)
        db.child("Users").push({"email": _email, "password": _hashed_password, "party": _party, "interest": _interest})
        return "Your registration is completed!"
    else:
        return render_template("register.html")

@app.route('/signin', methods = ["GET", "POST"])
def signin():
    if request.method == "POST":
        return "You are signed in!"
    else:
        return render_template("signin.html")


if __name__ == "__main__":
    app.secret_key = '123456789'
    socketio.run(app)

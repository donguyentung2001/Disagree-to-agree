from flask import Flask, render_template, request, session
from werkzeug.security import generate_password_hash, check_password_hash
import pyrebase
from flask_socketio import SocketIO, send
from database.firebase_config import firebase_config

firebase = pyrebase.initialize_app(firebase_config)

db = firebase.database()

app = Flask(__name__)

socketio=SocketIO(app)

@app.route('/')
def homepage():
    return render_template('home.html')

@app.route('/chat')
def chat(): 
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

if __name__ == "__main__":
    socketio.run(app)

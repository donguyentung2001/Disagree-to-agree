from flask import Flask, render_template, request
from werkzeug.security import generate_password_hash, check_password_hash
import pyrebase
from database.firebase_config import firebase_config

firebase = pyrebase.initialize_app(firebase_config)

db = firebase.database()

app = Flask(__name__)

@app.route('/')
def homepage():
    return 'Homepage'

@app.route('/register', methods = ["GET", "POST"])
def register():
    if request.method == "POST":
        print(request.form)
        _email = request.form["email"]
        _password = request.form["password"]
        _party = request.form["party"]
        _interest = request.form["interest"]
        if _password:
            _hashed_password = generate_password_hash(_password)
        db.child("Users").push({"email": _email, "password": _password, "party": _party, "interest": _interest})
        return "Works"
    else:
        return render_template("register.html")

if __name__ == "__main__":
    app.run()

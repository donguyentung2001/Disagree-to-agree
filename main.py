from flask import Flask
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
    return "Registration"

if __name__ == "__main__":
    app.run()

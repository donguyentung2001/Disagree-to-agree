from flask import Flask
app = Flask(__name__)

@app.route('/')
def homepage():
    return 'Homepage'

@app.route('/register', methods = ["GET", "POST"])
def register():
    return "Register"

app.run()

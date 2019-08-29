from flask import Flask, request, render_template, redirect

app = Flask(__name__)
app.config["CACHE_TYPE"] = "null"
app.config['DEBUG'] = True

@app.route('/')
def searchpage():
    return render_template('base.html')

app.run()
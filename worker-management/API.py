#Stephen Bowen 2021

# System modules
from __future__ import print_function
import os
import time
import requests
import logging
import socket
from functools import wraps
import datetime

# Server modules
import flask
from flask import Flask, jsonify, request, make_response
from flask_sqlalchemy import SQLAlchemy
import jwt

# Custom modules
from estop import EstopNoGui
from control import SpotAPI

# Set the web app name and create the app object
app = Flask("OnTheSpotAPI")
# Set the secret key for the app
app.config['SECRET_KEY'] = 'thisissecret' # COME UP WITH A BETTER SECRET!!!!!!!
# Set the database URI
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:worker-management/db.sqlite3' # I think this will work but who knows
# Set the db connection'
db = SQLAlchemy(app)

# Definition of a user of the application
class User(db.Model):
    # OnTheSpot system user credentials
    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.String(50), unique=True)
    name = db.Column(db.String(50))
    password = db.Column(db.String(80))

    # Spot credentials associated with user
    spotUser = db.Column(db.String(50))
    spotPass = db.Column(db.String(50))

# Define function for retrieving local IP address
def getIP():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.connect(("192.168.80.3", 80))
    ip = s.getsockname()[0]
    s.close()
    return ip

# Function wrapper that authenticates the session with JWT token
def tokenRequired(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'x-access-token' in request.headers:
           token = request.headers['x-access-token']
        if not token:
               return jsonify({'message' : 'Token is missing!'}), 401
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'])
            current_user = User.query.filter_by(public_id=data['public_id']).first() # Change to our user storer with SQL server
        except:
            return jsonify({'message' : 'Token is invalid!'}), 401
        return f(current_user, *args, *kwargs)
    return decorated

# Log the user in to the system
@app.route('/login')
def login():
    auth = request.authorization

    if not auth or not auth.username or not auth.password:
        return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})

    user = User.query.filter_by(name=auth.username).first()

    if not user:
        return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})

    token = jwt.encode({'public_id' : user.public_id, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=30)}, app.config['SECRET_KEY'])
    return jsonify({'token' : token.decode('UTF-8')})

# Log user into spot and create instance of API
def authenticate(current_user: User):
    global activeAPI
    try:
        activeAPI = SpotAPI(current_user.spotUser, current_user.spotPass, "192.168.80.3")
        return flask.jsonify({"value": activeAPI.auth()})
    except:
        return flask.jsonify({"value": False})

# Toggle robot power
@app.route('/TogglePower')
def togglePower(current_user: User):
    global activeAPI
    try:
        return flask.jsonify({"value": activeAPI.togglePower()})
    except:
        return flask.jsonify({"value": False})

# Receive generic request and execute the command
@app.route('/GenericMovementRequest')
@tokenRequired
def genericMovement(current_user: User):
    global activeAPI
    try:
        return flask.jsonify({"value": activeAPI.genericMovement(flask.request.args.get("request"))})
    except:
        return flask.jsonify({"value": False})

# Receive yaw, roll, and pitch then set Spot's standing pose
@app.route('/SetPose')
@tokenRequired
def setPose(current_user: User):
    try:
        global activeAPI
        return flask.jsonify({"value": activeAPI.setPose(float(flask.request.args.get("yaw")), float(flask.request.args.get("roll")), float(flask.request.args.get("pitch")))})
    except:
        return flask.jsonify({"value": False})

# Trigger EStop
@app.route('/EStop')
@tokenRequired
def eStop(current_user: User):
    global activeAPI
    try:
        return flask.jsonify({"value": activeAPI.eStop()})
    except:
        return flask.jsonify({"value": False})

# Clear EStop
@app.route('/ClearEStop')
@tokenRequired
def clearEStop(current_user: User):
    global activeAPI
    try:
        return flask.jsonify({"value": activeAPI.clearEStop()})
    except:
        return flask.jsonify({"value": False})

# End connection to robot and set activeAPI to NULL
@app.route('/EndConnection')
@tokenRequired
def endConnection(current_user: User):
    global activeAPI
    try:
        status = activeAPI.endConnection()
        activeAPI = None
        return flask.jsonify({"value": status})
    except:
        return flask.jsonify({"value": False})

# Run web app on this machine
if __name__ == '__main__':
    app.run(host=getIP(), port=8080, debug=False)
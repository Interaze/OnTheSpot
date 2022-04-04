#Stephen Bowen 2021

# System modules
from __future__ import print_function
import os
import time
import requests
import logging
import socket
from functools import wraps

# Server modules
import flask
from flask import Flask, jsonify, request
import jwt

# Custom modules
from estop import EstopNoGui
from control import SpotAPI

# Define function for retrieving local IP address
def getIP():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.connect(("192.168.80.3", 80))
    ip = s.getsockname()[0]
    s.close()
    return ip

# Set the web app name and create the app object
app = Flask("SpotAPI")
# Set the secret key for the app
app.config['SECRET_KEY'] = 'thisissecret' 

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
            current_user = User.query.filter_by(public_id=data['public_id']).first()
        except:
            return jsonify({'message' : 'Token is invalid!'}), 401
        return f(current_user, *args, *kwargs)
    return decorated

# Log user into spot and create instance of API
@app.route('/Auth')
def authenticate():
    global activeAPI
    try:
        activeAPI = SpotAPI(flask.request.args.get("user"), flask.request.args.get("pass"), flask.request.args.get("host"))
        return flask.jsonify({"value": activeAPI.auth()})
    except:
        return flask.jsonify({"value": False})

# Toggle robot power
@app.route('/TogglePower')
def togglePower():
    global activeAPI
    try:
        return flask.jsonify({"value": activeAPI.togglePower()})
    except:
        return flask.jsonify({"value": False})

# Receive generic request and execute the command
@app.route('/GenericMovementRequest')
def genericMovement():
    global activeAPI
    try:
        return flask.jsonify({"value": activeAPI.genericMovement(flask.request.args.get("request"))})
    except:
        return flask.jsonify({"value": False})

# Receive yaw, roll, and pitch then set Spot's standing pose
@app.route('/SetPose')
def setPose():
    try:
        global activeAPI
        return flask.jsonify({"value": activeAPI.setPose(float(flask.request.args.get("yaw")), float(flask.request.args.get("roll")), float(flask.request.args.get("pitch")))})
    except:
        return flask.jsonify({"value": False})

# Trigger EStop
@app.route('/EStop')
def eStop():
    global activeAPI
    try:
        return flask.jsonify({"value": activeAPI.eStop()})
    except:
        return flask.jsonify({"value": False})

# Clear EStop
@app.route('/ClearEStop')
def clearEStop():
    global activeAPI
    try:
        return flask.jsonify({"value": activeAPI.clearEStop()})
    except:
        return flask.jsonify({"value": False})

# End connection to robot and set activeAPI to NULL
@app.route('/EndConnection')
def endConnection():
    global activeAPI
    try:
        status = activeAPI.endConnection()
        activeAPI = None
        return flask.jsonify({"value": status})
    except:
        return flask.jsonify({"value": False})

# Run web app on this machine
if __name__ == '__main__':
    print(getIP())
    app.run(host=getIP(), port=8080, debug=True)
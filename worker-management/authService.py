# Stephen Bowen 2022
# This file is responsible for authenticating users and creating tokens for them.

# Imports
from mimetypes import init
import mysql.connector
import json
import hashlib

class AuthService:

    def __init__(self):
        self.db = mysql.connector.connect(
            host="localhost", # All of this is subject to change for deployment
            user="root",
            passwd="password",
            database="worker-management"
        )


    # Authenticate a user and return a token
    def authenticate(self, username, password):
        # Query the database for the user
        self.db.query("SELECT * FROM users WHERE username = %s", (username))
        # If the user exists, check the password
        if self.db.rowcount > 0:
            user = self.db.fetchone()
            if user[2] == password:
                # If the password is correct, return a token
                return self.create_token(user[0])
            else:
                # If the password is incorrect, return an error
                return "Password incorrect"
        pass

    # Create new user
    def create_user(self, username, password):
        pass

    # Remove user
    def remove_user(self, username):
        pass
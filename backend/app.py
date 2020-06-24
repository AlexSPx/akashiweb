from flask import Flask, redirect, make_response, jsonify, request, session
from requests_oauthlib import OAuth2Session
from models import *
import jwt
import datetime
import dotenv
import os
from flask_jwt_extended import (JWTManager, jwt_required,
                                jwt_refresh_token_required,
                                jwt_optional, fresh_jwt_required,
                                get_raw_jwt, get_jwt_identity,
                                create_access_token, create_refresh_token,
                                set_access_cookies, set_refresh_cookies,
                                unset_jwt_cookies,unset_access_cookies)
import json
from flask_cors import CORS

dotenv.load_dotenv()
app = Flask(__name__)

client_id = "591320769460436992"
client_secret = "HN93yn7Yrmghvrls2eSL0fFg8r-bAaX_"
authorization_base_url = 'https://discord.com/api/oauth2/authorize'
token_url='https://discord.com/api/oauth2/token'

# app.config['BASE_URL'] = 'https://akashi.nekyou.com/api'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://akashiapi:&hZ-]62NN4KstU}N@localhost:5432/akashitest'
app.config['JWT_SECRET_KEY'] = os.getenv('SECRET_KEY')  # Change this!
app.config['JWT_TOKEN_LOCATION'] = ['cookies']
app.config['JWT_COOKIE_CSRF_PROTECT'] = True
app.config['JWT_CSRF_CHECK_FORM'] = True
app.config['SECRET_KEY'] = 'cvauinnlö.vajingnrgjfnbjbjnbögjbbthb+göh69z5'
app.config["BASE_URL"] = "https://akashi.nekyou.com/"
app.config["APPLICATION_ROOT"] = "/api"
jwt = JWTManager(app)

cors = CORS(app, resources={r"/api/open/*": {"origins": "*"}})

@jwt.unauthorized_loader
def unauthorized_callback(callback):
    # No auth header
    return redirect('http://akashi.nekyou.com/api/login', 302)

@jwt.invalid_token_loader
def invalid_token_callback(callback):
    # Invalid Fresh/Non-Fresh Access token in auth header
    resp = make_response(redirect(app.config['BASE_URL'] + '/api/login'))
    unset_jwt_cookies(resp)
    return resp, 302

@jwt.expired_token_loader
def expired_token_callback(callback):
    # Expired auth header
    resp = make_response(redirect(app.config['BASE_URL'] + '/api/reload'))
    unset_access_cookies(resp)
    return resp, 302

@app.route('/api')
def logim():
    return 200

@app.route('/api/redirlogin')
def login():
    discord = OAuth2Session(client_id, scope='identify', redirect_uri='https://akashi.nekyou.com/api/callback')
    authorization_url, state = discord.authorization_url(authorization_base_url)

    # State is used to prevent CSRF, keep this for later.
    session['oauth_state'] = state
    return redirect(authorization_url)

@app.route('/api/callback')
def cb1():
    discord = OAuth2Session(client_id, state=session['oauth_state'], redirect_uri='https://akashi.nekyou.com/api/callback')
    token = discord.fetch_token(token_url, client_secret=client_secret,
                               authorization_response=request.url)

    return jsonify(discord.get('https://discord.com/api/users/@me').json())

@app.route('/api/callback/<name>')
def cb(name):
    return assign_access_refresh_tokens(name , 'http://akashi.nekyou.com/api/projects')

@app.route('/api/projects', methods=['GET'])
@jwt_required
def get_projects():
    name = get_jwt_identity()
    ch = Project.query.all()
    return jsonify([p.serialize for p in ch]), 200

@app.route('/api/open/projects', methods=['GET'])
def get_projects_open():
    ch = Project.query.all()
    return jsonify([p.serialize for p in ch]), 200

@app.route('/api/open/chapters', methods=['GET'])
def get_chapters_open():
    ch = Chapter.query.all()
    return jsonify([p.serialize for p in ch]), 200

def assign_access_refresh_tokens(user_id, url):
    access_token = create_access_token(identity=str(user_id))
    refresh_token = create_refresh_token(identity=str(user_id))
    resp = make_response(redirect(url, 302))
    set_access_cookies(resp, access_token)
    set_refresh_cookies(resp, refresh_token)
    return resp

def unset_jwt():
    resp = make_response(redirect(app.config['BASE_URL'] + '/', 302))
    unset_jwt_cookies(resp)
    return resp

db.init_app(app)



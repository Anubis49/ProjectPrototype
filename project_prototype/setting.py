from flask import Flask
from flask_restful import Resource, Api, fields, reqparse, marshal_with
from flask_sqlalchemy import SQLAlchemy
#from flask_cors import CORS

app = Flask(__name__)
connectionStr = 'mysql://anubis:rawr@localhost/test'
app.config['SQLALCHEMY_DATABASE_URI'] = connectionStr
db = SQLAlchemy(app)
api = Api(app)
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

from flask_cors import CORS

db = SQLAlchemy()


def create_app():

    app = Flask(__name__,)
    CORS(app, resources={r"/*": {"origins": "*"}}) #

    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://hackatontarodb_owner:fq8Fs0SxElgk@ep-red-hall-a2te6pnv.eu-central-1.aws.neon.tech/hackatontarodb?sslmode=require'

    app.secret_key = 'Serg2r23g2t'
    
    db.init_app(app)

    from routes import register_routes

    register_routes(app, db)

    migrate = Migrate(app, db)

    return app



from flask import Flask
from .db.database import db


def create_app():
    app = Flask(__name__)

    # Configure the SQLite database
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///data.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    # Initialize the database with the app
    db.init_app(app)

    # Register blueprints (routes)
    from .routes.upload import upload_bp

    app.register_blueprint(upload_bp)

    return app

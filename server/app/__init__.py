from flask import Flask
from flask_cors import CORS
from .db.database import db


def create_app():
    app = Flask(__name__)

    # Load configuration
    app.config.from_object("app.config.Config")  # Ensure this matches the import path

    # Initialize the database with the app
    db.init_app(app)

    # Enable CORS for all routes
    CORS(
        app,
    )

    # Register blueprints (routes)
    from .routes.dataset import dataset_bp

    app.register_blueprint(dataset_bp)

    return app

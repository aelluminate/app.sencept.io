import os
from app import create_app
from db.database import db
from flask_migrate import Migrate

# Set FLASK_APP programmatically
os.environ["FLASK_APP"] = "main.py"
os.environ["PYTHONDONTWRITEBYTECODE"] = "1"

# Create the Flask app
app = create_app()

# Initialize Flask-Migrate
migrate = Migrate(app, db)

# Create the database tables (only needed once during initial setup)
with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)

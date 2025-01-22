import uuid
from ..db.database import db
from datetime import datetime


class Dataset(db.Model):
    id = db.Column(
        db.String(36), primary_key=True, default=lambda: str(uuid.uuid4())
    )  # Random alphanumeric ID
    name = db.Column(db.String(255), nullable=False)  # Name of the dataset
    filename = db.Column(db.String(255), nullable=False)  # Original filename
    filepath = db.Column(db.String(255), nullable=False)  # Path to the uploaded file
    filesize = db.Column(db.Integer, nullable=False)  # Size of the file in bytes
    upload_date = db.Column(db.DateTime, default=datetime.utcnow)  # Timestamp of upload

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "filename": self.filename,
            "filepath": self.filepath,
            "filesize": self.filesize,
            "upload_date": self.upload_date.isoformat(),
        }

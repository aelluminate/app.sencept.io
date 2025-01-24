import uuid
from enum import Enum
from ..db.database import db
from datetime import datetime, timezone


def generate_short_uuid():
    return str(uuid.uuid4())[:8]


class CategoryEnum(Enum):
    GENERATED = "Generated"
    UPLOADED = "Uploaded"
    REGENERATED = "Regenerated"


class Dataset(db.Model):
    id = db.Column(db.String(8), primary_key=True, default=generate_short_uuid)
    name = db.Column(db.String(255), nullable=False)
    filename = db.Column(db.String(255), nullable=False)
    filepath = db.Column(db.String(255), nullable=False)
    filesize = db.Column(db.Integer, nullable=False)
    upload_date = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    category = db.Column(db.Enum(CategoryEnum), default=CategoryEnum.UPLOADED)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "filename": self.filename,
            "filepath": self.filepath,
            "filesize": self.filesize,
            "upload_date": self.upload_date.isoformat(),
            "category": self.category.value,
        }

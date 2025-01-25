import uuid
from datetime import datetime, timezone

from db.database import db
from .options.category import CATEGORY_OPTIONS


def generate_short_uuid():
    return str(uuid.uuid4())[:8]


class Dataset(db.Model):
    id = db.Column(db.String(8), primary_key=True, default=generate_short_uuid)
    name = db.Column(db.String(255), nullable=False)
    filename = db.Column(db.String(255), nullable=False)
    filepath = db.Column(db.String(255), nullable=False)
    filesize = db.Column(db.Integer, nullable=False)
    category = db.Column(db.Enum(CATEGORY_OPTIONS), default=CATEGORY_OPTIONS.UPLOADED)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(
        db.DateTime,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "filename": self.filename,
            "filepath": self.filepath,
            "filesize": self.filesize,
            "category": self.category.value,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
        }

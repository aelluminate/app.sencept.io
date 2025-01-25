import os


class Config:
    # Folder to store uploaded datasets

    UPLOAD_FOLDER = os.path.join(os.getcwd(), "uploads")

    # Supported file types
    ALLOWED_EXTENSIONS = {
        "csv",
        "xlsx",
        "json",
        "xml",
        "parquet",
    }

    # 100 MB file size limit
    MAX_FILE_SIZE = 100 * 1024 * 1024

    # SQLite database configuration
    SQLALCHEMY_DATABASE_URI = "sqlite:///datasets.db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False

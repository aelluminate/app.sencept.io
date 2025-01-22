import os


class Config:
    UPLOAD_FOLDER = os.path.join(os.getcwd(), "uploads")
    ALLOWED_EXTENSIONS = {"csv", "xlsx", "json", "xml", "parquet"}
    MAX_FILE_SIZE = 100 * 1024 * 1024  # 100 MB

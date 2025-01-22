import os
import pandas as pd
from werkzeug.utils import secure_filename
from ..utils.file_utils import allowed_file
from ..config.config import Config
from ..models.file_model import UploadedFile
from ..db.database import db
import logging

logger = logging.getLogger(__name__)


class UploadService:
    @staticmethod
    def process_upload(file):
        if file.filename == "":
            return {"error": "No selected file"}, 400

        if not allowed_file(file.filename):
            return {
                "error": f"Invalid file type. Allowed types: {', '.join(Config.ALLOWED_EXTENSIONS)}"
            }, 400

        # Check file size
        file.seek(0, os.SEEK_END)
        file_size = file.tell()
        file.seek(0)

        if file_size > Config.MAX_FILE_SIZE:
            return {
                "error": f"File size exceeds the limit of {Config.MAX_FILE_SIZE / (1024 * 1024)} MB"
            }, 400

        # Secure the filename and save the file permanently
        filename = secure_filename(file.filename)
        filepath = os.path.join(Config.UPLOAD_FOLDER, filename)
        os.makedirs(Config.UPLOAD_FOLDER, exist_ok=True)
        file.save(filepath)

        try:
            # Save file metadata to the database
            uploaded_file = UploadedFile(
                filename=filename,
                filepath=filepath,
                filesize=file_size,
            )
            db.session.add(uploaded_file)
            db.session.commit()

            # Read the file and return a summary
            if filename.endswith(".csv"):
                df = pd.read_csv(filepath)
            elif filename.endswith(".xlsx"):
                df = pd.read_excel(filepath)
            elif filename.endswith(".json"):
                df = pd.read_json(filepath)
            elif filename.endswith(".xml"):
                df = pd.read_xml(filepath)
            elif filename.endswith(".parquet"):
                df = pd.read_parquet(filepath)
            else:
                return {"error": "Unsupported file type"}, 400

            summary = {
                "message": "File successfully uploaded and processed",
                "rows": len(df),
                "columns": list(df.columns),
                "sample": df.head(1).to_dict(orient="records"),
            }

            logger.info(f"File '{filename}' uploaded and processed successfully.")
            return summary, 200

        except Exception as e:
            logger.error(f"Error processing file '{filename}': {str(e)}")
            return {"error": f"An error occurred: {str(e)}"}, 500

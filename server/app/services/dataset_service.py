import os
import pandas as pd
from werkzeug.utils import secure_filename
from ..utils.file_utils import allowed_file
from ..config import Config
from ..models.dataset_model import Dataset, CategoryEnum
from ..db.database import db
import logging

logger = logging.getLogger(__name__)


class DatasetService:
    @staticmethod
    def upload_dataset(file, dataset_name, category=CategoryEnum.UPLOADED.value):
        """Upload and process a dataset file."""
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

        # Secure the filename and save the file temporarily
        filename = secure_filename(file.filename)
        temp_filepath = os.path.join(Config.UPLOAD_FOLDER, filename)
        os.makedirs(Config.UPLOAD_FOLDER, exist_ok=True)
        file.save(temp_filepath)

        try:
            # Read the file into a DataFrame
            if filename.endswith(".csv"):
                df = pd.read_csv(temp_filepath)
            elif filename.endswith(".xlsx"):
                df = pd.read_excel(temp_filepath)
            elif filename.endswith(".json"):
                df = pd.read_json(temp_filepath)
            elif filename.endswith(".xml"):
                df = pd.read_xml(temp_filepath)
            elif filename.endswith(".parquet"):
                df = pd.read_parquet(temp_filepath)
            else:
                return {"error": "Unsupported file type"}, 400

            # Replace NaN values with null
            df = df.where(pd.notnull(df), None)

            # Convert the DataFrame to JSON
            json_data = df.to_json(orient="records", indent=4)

            # Save the JSON data to a new file
            json_filename = f"{os.path.splitext(filename)[0]}.json"
            json_filepath = os.path.join(Config.UPLOAD_FOLDER, json_filename)
            with open(json_filepath, "w") as json_file:
                json_file.write(json_data)

            dataset = Dataset(
                name=dataset_name,
                filename=json_filename,
                filepath=json_filepath,
                filesize=os.path.getsize(json_filepath),
                category=CategoryEnum[category.upper()],
            )
            db.session.add(dataset)
            db.session.commit()

            # Return a summary
            summary = {
                "message": "Dataset successfully uploaded and processed",
                "dataset_id": dataset.id,
                "name": dataset.name,
                "rows": len(df),
                "filesize": dataset.filesize,
                "category": dataset.category.value,
            }

            logger.info(
                f"Dataset '{dataset_name}' uploaded and processed successfully."
            )
            return summary, 200

        except Exception as e:
            logger.error(f"Error processing dataset '{dataset_name}': {str(e)}")
            return {"error": f"An error occurred: {str(e)}"}, 500

        finally:
            # Clean up: Delete the temporary uploaded file
            if os.path.exists(temp_filepath):
                os.remove(temp_filepath)

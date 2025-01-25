import os
import logging
import pandas as pd
from werkzeug.utils import secure_filename

from utils.file_utils import allowed_file
from config import Config
from models.dataset_model import Dataset
from models.options.category import CATEGORY_OPTIONS
from db.database import db


logger = logging.getLogger(__name__)


class DatasetService:
    @staticmethod
    def validate_file(file):
        """Validate the uploaded file."""
        if file.filename == "":
            raise ValueError("No selected file")

        if not allowed_file(file.filename):
            raise ValueError(
                f"Invalid file type. Allowed types: {', '.join(Config.ALLOWED_EXTENSIONS)}"
            )

        # Check file size
        file.seek(0, os.SEEK_END)
        file_size = file.tell()
        file.seek(0)

        if file_size > Config.MAX_FILE_SIZE:
            raise ValueError(
                f"File size exceeds the limit of {Config.MAX_FILE_SIZE / (1024 * 1024)} MB"
            )

    @staticmethod
    def process_file(file):
        """Process the uploaded file and convert it to JSON."""
        filename = secure_filename(file.filename)
        temp_filepath = os.path.join(Config.UPLOAD_FOLDER, filename)
        os.makedirs(Config.UPLOAD_FOLDER, exist_ok=True)  # Ensure the directory exists
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
                raise ValueError("Unsupported file type")

            # Replace NaN values with null
            df = df.where(pd.notnull(df), None)

            # Convert the DataFrame to JSON
            json_data = df.to_json(orient="records", indent=4)

            # Save the JSON data to a new file
            json_filename = f"{os.path.splitext(filename)[0]}.json"
            json_filepath = os.path.join(Config.UPLOAD_FOLDER, json_filename)
            with open(json_filepath, "w") as json_file:
                json_file.write(json_data)

            return json_filename, json_filepath, len(df)

        finally:
            # Clean up: Delete the temporary uploaded file
            if os.path.exists(temp_filepath):
                os.remove(temp_filepath)

    @staticmethod
    def upload_dataset(file, dataset_name, category=CATEGORY_OPTIONS.UPLOADED.value):
        """Upload and process a dataset file."""
        try:
            # Validate the file
            DatasetService.validate_file(file)

            # Process the file
            json_filename, json_filepath, num_rows = DatasetService.process_file(file)

            # Create and save the dataset
            dataset = Dataset(
                name=dataset_name,
                filename=json_filename,
                filepath=json_filepath,
                filesize=os.path.getsize(json_filepath),
                category=CATEGORY_OPTIONS[category.upper()],
            )
            db.session.add(dataset)
            db.session.commit()

            # Return a summary
            summary = {
                "message": "Dataset successfully uploaded and processed",
                "dataset_id": dataset.id,
                "name": dataset.name,
                "rows": num_rows,
                "filesize": dataset.filesize,
                "category": dataset.category.value,
            }

            logger.info(
                f"Dataset '{dataset_name}' uploaded and processed successfully."
            )
            return summary, 200

        except ValueError as e:
            logger.error(f"Validation error: {str(e)}")
            return {"error": str(e)}, 400

        except Exception as e:
            logger.error(f"Error processing dataset '{dataset_name}': {str(e)}")
            return {"error": f"An error occurred: {str(e)}"}, 500

    @staticmethod
    def update_dataset(dataset_id, update_data):
        """Update a dataset by ID."""
        try:
            # Fetch the dataset from the database
            dataset = Dataset.query.get_or_404(dataset_id)

            # Validate the update data
            if not update_data:
                raise ValueError("No data provided for update")

            # Update the dataset fields if provided
            if "name" in update_data:
                dataset.name = update_data["name"]

            if "category" in update_data:
                # Validate the category value
                try:
                    category = CATEGORY_OPTIONS(update_data["category"])
                    dataset.category = category
                except ValueError:
                    raise ValueError("Invalid category value")

            # Handle file update
            if "file" in update_data:
                file = update_data["file"]
                # Validate the file
                DatasetService.validate_file(file)

                # Process the file
                json_filename, json_filepath, num_rows = DatasetService.process_file(
                    file
                )

                # Update the dataset with the new file details
                dataset.filename = json_filename
                dataset.filepath = json_filepath
                dataset.filesize = os.path.getsize(json_filepath)

            # Save the changes to the database
            db.session.commit()

            # Return the updated dataset
            return dataset.to_dict()

        except Exception as e:
            db.session.rollback()  # Rollback in case of an error
            logger.error(f"Error updating dataset {dataset_id}: {str(e)}")
            raise e

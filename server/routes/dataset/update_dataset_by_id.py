import logging
from flask import jsonify, request

from . import dataset_bp
from services.dataset.dataset_service import DatasetService


logger = logging.getLogger(__name__)


@dataset_bp.route("/datasets/<dataset_id>", methods=["PUT"])
def update_dataset_by_id(dataset_id):
    try:
        # Initialize update_data
        update_data = {}

        # Check if the request contains a file
        if "file" in request.files:
            file = request.files["file"]
            update_data["file"] = file

        # Check if the request is JSON
        if request.is_json:
            update_data.update(request.get_json())
        else:
            # Handle form-data
            update_data.update(
                {
                    "name": request.form.get("name"),
                    "category": request.form.get("category"),
                }
            )

        # Remove None values from update_data
        update_data = {k: v for k, v in update_data.items() if v is not None}

        # Validate the update data
        if not update_data:  # Check if any field is provided
            return jsonify({"error": "No data provided for update"}), 400

        # Call the service to update the dataset
        updated_dataset = DatasetService.update_dataset(dataset_id, update_data)

        # Return the updated dataset
        return jsonify(updated_dataset)

    except ValueError as e:
        logger.error(f"Validation error updating dataset {dataset_id}: {str(e)}")
        return jsonify({"error": str(e)}), 400

    except Exception as e:
        logger.error(f"Error updating dataset {dataset_id}: {str(e)}")
        return jsonify({"error": "An error occurred while updating the dataset"}), 500

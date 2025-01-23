from flask import request, jsonify
from ...services.dataset_service import DatasetService
from . import dataset_bp


@dataset_bp.route("/datasets/upload", methods=["POST"])
def post_upload():
    try:
        # Check if the file is present in the request
        if "file" not in request.files:
            return jsonify({"error": "No file part"}), 400

        file = request.files["file"]
        # Get dataset name from form data
        dataset_name = request.form.get("name", "Unnamed Dataset")

        # Process the file using the DatasetService
        result, status_code = DatasetService.upload_dataset(file, dataset_name)

        # Ensure the result is a dictionary
        if not isinstance(result, dict):
            return jsonify({"error": "Invalid response from DatasetService"}), 500

        # Return the result as JSON
        return jsonify(result), status_code

    except Exception as e:
        # Log the error and return a JSON response
        print(f"Error in post_upload: {str(e)}")
        return jsonify({"error": "An error occurred while processing the request"}), 500

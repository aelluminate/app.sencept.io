from flask import request, jsonify
from ...services.dataset_service import DatasetService
from . import dataset_bp


@dataset_bp.route("/datasets/upload", methods=["POST"])
def upload_dataset():
    # Upload a dataset file
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files["file"]
    # Get dataset name from form data
    dataset_name = request.form.get("name", "Unnamed Dataset")

    # Process the file using the DatasetService
    result, status_code = DatasetService.upload_dataset(file, dataset_name)
    return jsonify(result), status_code

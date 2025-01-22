from flask import Blueprint, request, jsonify
from ..services.upload_service import UploadService

upload_bp = Blueprint("upload", __name__)


@upload_bp.route("/upload", methods=["POST"])
def upload_file():
    # Check if the file is included in the request
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files["file"]

    # Process the file using the UploadService
    result, status_code = UploadService.process_upload(file)
    return jsonify(result), status_code

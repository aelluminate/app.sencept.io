import os
from werkzeug.utils import secure_filename


def allowed_file(filename):
    """Check if the file has an allowed extension."""
    return "." in filename and filename.rsplit(".", 1)[1].lower() in {
        "csv",
        "xlsx",
        "json",
        "xml",
        "parquet",
    }


def save_temp_file(file, upload_folder):
    """Save the uploaded file temporarily and return its path."""
    filename = secure_filename(file.filename)
    temp_filepath = os.path.join(upload_folder, filename)
    os.makedirs(upload_folder, exist_ok=True)
    file.save(temp_filepath)
    return temp_filepath

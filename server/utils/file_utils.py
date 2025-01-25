from config import Config


def allowed_file(filename):
    # Check if the file has an allowed extension
    return (
        "." in filename
        and filename.rsplit(".", 1)[1].lower() in Config.ALLOWED_EXTENSIONS
    )

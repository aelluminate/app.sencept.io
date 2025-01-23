from flask import Blueprint

# Define the blueprint
dataset_bp = Blueprint("dataset", __name__)

# Import routes
from .get import list_datasets
from .post_upload import post_upload
from .get_dataset_data import get_dataset_data

from flask import Blueprint

# Define the blueprint
dataset_bp = Blueprint("dataset", __name__)

# Import routes
from .get_datasets import get_datasets
from .post_dataset_upload import post_dataset_upload
from .get_dataset_data_by_id import get_dataset_data_by_id

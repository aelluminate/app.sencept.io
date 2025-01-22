from flask import jsonify
from ...models.dataset_model import Dataset
from . import dataset_bp


@dataset_bp.route("/datasets", methods=["GET"])
def list_datasets():
    # List all uploaded datasets
    datasets = Dataset.query.all()
    return jsonify([dataset.to_dict() for dataset in datasets])

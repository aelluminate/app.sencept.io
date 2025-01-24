import logging
from flask import jsonify, request

from . import dataset_bp
from models.dataset_model import Dataset


logger = logging.getLogger(__name__)


@dataset_bp.route("/datasets", methods=["GET"])
def get_datasets():
    try:
        # Get pagination parameters from the request
        page = request.args.get("page", default=1, type=int)
        limit = request.args.get("limit", default=15, type=int)

        # Validate pagination parameters
        if page < 1 or limit < 1:
            return jsonify({"error": "Invalid pagination parameters"}), 400

        # Calculate the offset for pagination
        offset = (page - 1) * limit

        # Query the datasets with pagination
        datasets = Dataset.query.offset(offset).limit(limit).all()
        total_datasets = Dataset.query.count()

        # Convert datasets to a list of dictionaries
        datasets_list = [dataset.to_dict() for dataset in datasets]

        # Return the paginated response
        return jsonify(
            {
                "data": datasets_list,
                "page": page,
                "limit": limit,
                "total": total_datasets,
            }
        )

    except Exception as e:
        logger.error(f"Error fetching datasets: {str(e)}")
        return jsonify({"error": "An error occurred while fetching datasets"}), 500

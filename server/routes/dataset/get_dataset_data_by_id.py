import json
import logging
from flask import jsonify, request

from . import dataset_bp
from models.dataset_model import Dataset


logger = logging.getLogger(__name__)


@dataset_bp.route("/datasets/<dataset_id>", methods=["GET"])
def get_dataset_data_by_id(dataset_id):
    try:
        # Get pagination parameters from the request
        page = request.args.get("page", default=1, type=int)
        limit = request.args.get("limit", default=15, type=int)

        # Validate pagination parameters
        if page < 1 or limit < 1:
            return jsonify({"error": "Invalid pagination parameters"}), 400

        # Fetch the dataset from the database
        dataset = Dataset.query.get_or_404(dataset_id)

        # Load the JSON file
        with open(dataset.filepath, "r") as json_file:
            data = json.load(json_file)

        # Paginate the data
        start = (page - 1) * limit
        end = start + limit
        paginated_data = data[start:end]

        # Return the paginated data
        return jsonify(
            {
                "data": paginated_data,
                "page": page,
                "limit": limit,
                "total": len(data),
            }
        )

    except FileNotFoundError:
        logger.error(f"JSON file not found for dataset ID: {dataset_id}")
        return jsonify({"error": "Dataset file not found"}), 404

    except json.JSONDecodeError:
        logger.error(f"Invalid JSON file for dataset ID: {dataset_id}")
        return jsonify({"error": "Invalid JSON file"}), 500

    except Exception as e:
        logger.error(f"Error fetching dataset data: {str(e)}")
        return jsonify({"error": "An error occurred while fetching dataset data"}), 500

from flask import Blueprint, request, jsonify
import requests

fetch_bp = Blueprint('fetch', __name__)

@fetch_bp.route('/api/fetchSchedule', methods=['POST'])
def fetch_schedule():
    user_input = request.json
    term = user_input.get("term")
    subject = user_input.get("subject")
    campus = user_input.get("campus")

    payload = {
        "term": term,
        "subject": subject,
        "campus": campus
    }

    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }

    response = requests.post("https://classes.sbctc.edu/api/Schedule/Search", json=payload, headers=headers)

    if response.ok:
        return jsonify(response.json())
    else:
        return jsonify({"error": "Failed to fetch schedule"}), response.status_code
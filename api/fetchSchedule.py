import requests
from flask import Blueprint, request, jsonify

fetch_bp = Blueprint('fetch_schedule', __name__)

@fetch_bp.route('/api/schedule', methods=['POST'])
def proxy_schedule():
    payload = request.get_json()
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }

    try:
        res = requests.post(
            'https://classes.sbctc.edu/api/Schedule/Search',
            headers=headers,
            json=payload
        )
        res.raise_for_status()
        return jsonify(res.json())
    except requests.RequestException as e:
        return jsonify({'error': str(e)}), 500

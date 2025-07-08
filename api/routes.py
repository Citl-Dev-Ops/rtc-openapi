from flask import Flask, request, jsonify
from term_code_utils import get_term_code_from_text

app = Flask(__name__)

@app.route('/api/term/convert', methods=['POST'])
def convert_term():
    data = request.get_json()
    term_text = data.get('term_text', '')
    term_code = get_term_code_from_text(term_text)
    return jsonify({"term_code": term_code})

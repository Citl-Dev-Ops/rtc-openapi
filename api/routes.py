from flask import Flask, request, jsonify
from term_code_utils import get_term_code_from_text
from fetch import fetch_bp  # ✅ Import fetch blueprint AFTER defining app

app = Flask(__name__)

# ✅ Register blueprint after app is defined
app.register_blueprint(fetch_bp)

@app.route('/api/term/convert', methods=['POST'])
def convert_term():
    data = request.get_json()
    term_text = data.get('term_text', '')
    term_code = get_term_code_from_text(term_text)
    return jsonify({"term_code": term_code})

if __name__ == '__main__':
    app.run(debug=True)
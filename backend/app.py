# /backend/app.py
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/api/data')
def get_data():
    return jsonify({'data': 'This is the response from Flask'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)  # Ensure the server listens on all interfaces


from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/api/endpoint', methods=['GET', 'POST'])
def handle_request():
    if request.method == 'POST':
        data = request.json
        response = {
            'status': 'success',
            'user_id': data.get('user_id'),
            'college_email_id': data.get('college_email_id'),
            'college_roll_number': data.get('college_roll_number'),
            'numbers': data.get('numbers', []),
            'alphabets': data.get('alphabets', []),
            'highest_lowercase_alphabet': get_highest_lowercase_alphabet(data.get('alphabets', []))
        }
        return jsonify(response)
    elif request.method == 'GET':
        return jsonify({'operation_code': '12345'})  # Example operation code

def get_highest_lowercase_alphabet(alphabets):
    lowercase_alphabets = [char for char in alphabets if char.islower()]
    if not lowercase_alphabets:
        return []
    highest_alphabet = max(lowercase_alphabets)
    return [highest_alphabet] * lowercase_alphabets.count(highest_alphabet)

if __name__ == '__main__':
    app.run(debug=True)

from flask import Flask, render_template, request, jsonify
import google.generativeai as genai

# Configure Gemini API key
genai.configure(api_key="AIzaSyCrQI9Zcj-h-R67_IH9zZkabGGYj1bZF04")
model = genai.GenerativeModel("gemini-1.5-flash")
chat = model.start_chat(history=[])

# Initialize Flask app
app = Flask(__name__)

# Route to serve the HTML file
@app.route("/")
def home():
    return render_template("index.html")  # Make sure index.html is in the 'templates' folder

# Route to handle chatbot requests
@app.route("/api/chat", methods=["POST"])
def chat_with_bot():
    user_message = request.json.get("message")
    if not user_message:
        return jsonify({"error": "No message provided"}), 400

    # Send the user's message to Gemini API and get the response
    try:
        response = chat.send_message(user_message)
        bot_message = "".join([chunk.text for chunk in response])
        return jsonify({"response": bot_message})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)

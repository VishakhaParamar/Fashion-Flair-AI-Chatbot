# Fashion Flair AI Chatbot

Fashion Flair AI is a chatbot application designed to provide users with style tips, fashion trends, outfit suggestions, and other fashion-related advice. The chatbot leverages Google’s Gemini generative AI model to deliver intelligent and interactive responses to user queries.

## Features
- **Latest Fashion Trends**: Get insights into current fashion trends.
- **Color Advice**: Learn about seasonal color palettes.
- **Outfit Suggestions**: Receive tailored outfit recommendations for various occasions.
- **Accessory Pairing**: Discover the best accessories to complement your outfits.
- **Styling Tips**: Get advice on how to style denim jackets and other fashion items.

## Technology Stack
- **Backend**: Flask (Python framework)
- **Frontend**: HTML/CSS (served through Flask templates)
- **AI Model**: Google’s Gemini-1.5-flash generative AI

## Installation and Setup

### Prerequisites
1. Python 3.8 or above
2. Flask library
3. Google’s Generative AI SDK (`google.generativeai`)

### Steps to Set Up
1. Clone the repository:
   ```bash
   git clone <https://github.com/VishakhaMP/Fashion-Flair/>
   cd <Fashion-Flair>
   ```

2. Install the required Python packages:
   ```bash
   pip install flask google-generativeai
   ```

3. Configure the Gemini API key:
   - Replace the placeholder `AIzaSyCrQI9Zcj-h-R67_IH9zZkabGGYj1bZF04` in the code with your valid API key.

4. Ensure the `index.html` file is placed inside the `templates` folder.

5. Run the Flask application:
   ```bash
   python app.py
   ```

6. Open your browser and navigate to `http://127.0.0.1:5000/` to access the chatbot.

## File Structure
```
project-folder/
|-- templates/
|   |-- index.html
|-- app.py
|-- README.md
```

## API Endpoints

### `GET /`
- **Description**: Serves the main chatbot interface.
- **Response**: HTML page with the chatbot UI.

### `POST /api/chat`
- **Description**: Handles user queries and returns chatbot responses.
- **Request Body**: JSON containing the user's message, e.g.,
  ```json
  {
    "message": "What are the latest fashion trends?"
  }
  ```
- **Response Body**: JSON containing the chatbot's reply, e.g.,
  ```json
  {
    "response": "Here are the top fashion trends this season:..."
  }
  ```
- **Error Handling**:
  - Returns `400` if no message is provided.
  - Returns `500` for any internal errors.


## Future Enhancements
- Add user authentication for personalized recommendations.
- Enhance UI for a more engaging chatbot experience.
- Incorporate image-based fashion advice.
- Support for multiple languages.

## Acknowledgments
- Google’s Gemini API for powering the chatbot.
- Flask for simplifying web application development.


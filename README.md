# Event-Greetings-AI
Event Greetings AI is a simple web application and server built with Express.js and powered by OpenAI's GPT-3.5 to generate personalized event greetings.
Users can choose an event (birthday, wedding, or graduation), provide additional details, and receive AI-generated greetings in response.

Features
Event Selection: Choose from various events, including birthdays, weddings, and graduations.
Additional Details: Provide specific details such as age, relation, degree, type of blessing, and desired atmosphere.
AI-Generated Greetings: OpenAI's GPT-3.5 generates customized greetings based on user input.
Unit Testing: The application includes unit tests using Jest and Supertest for reliability.

Project Structure:
server.js: Express.js server setup with OpenAI integration.
test.test.js: Unit tests for server routes and prompt generation.
index.html: HTML file containing the user interface.
script.js: JavaScript file handling user interactions and making requests to the server.
style.css: CSS file for styling the web interface.

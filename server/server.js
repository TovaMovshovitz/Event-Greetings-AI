const express = require('express');
const bodyParser = require('body-parser');
const { OpenAIAPI } = require('openai'); // Use the appropriate OpenAI SDK or HTTP library

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Handle POST requests for generating greetings
app.post('/generate-greeting', async (req, res) => {
    const { event, age, type, atmosphere } = req.body;

    // Build a prompt for OpenAI GPT
    const prompt = `Write me a${age ? ` ${age}-year-old` : ''} ${event} greeting in a ${type}, ${atmosphere} atmosphere`;

    // Use the OpenAI API to generate a greeting
    const generatedGreeting = await openAIAPI.generate(prompt);

    // Send the generated greeting back to the client
    res.json({ greeting: generatedGreeting });
});

// Handle other routes as needed

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

const express = require("express");
const { OpenAI } = require("openai");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const bodyParser = require("body-parser");

const app = express();
const port = 3000;
const openai = new OpenAI({ apiKey: process.env.APIKEY });

app.use(cors());
app.use(bodyParser.json());

const generatePrompt = (params) => {
  const { event, age, relation, degree, type, atmosphere } = params;
  let prompt = `Write me a`;
  if (age) prompt += ` ${age}-year-old`;
  prompt += ` ${event} greeting`;

  switch (event) {
    case "birthday":
      break;
    case "wedding":
      if (relation) prompt += ` for the ${relation}`;
      break;
    case "graduation":
      if (degree) prompt += ` for the graduate with a ${degree} degree`;
      break;
    default:
      break;
  }

  if (type) prompt += ` of type ${type}`;
  if (atmosphere) prompt += ` in a ${atmosphere} atmosphere`;
  prompt += ` return 3 greetings in a parsable JSON format like follows:
  { "1": "first greeting", "2": "second greeting", "3": "third greeting" }`;
  return prompt;
};

app.post("/generate-greeting", async (req, res) => {
  try {
    const prompt = generatePrompt(req.body);

    const generatedGreetings = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
      temperature: 0.8,
    });
    const response = generatedGreetings.choices[0].message.content;
    res.send(response);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports={app,generatePrompt}
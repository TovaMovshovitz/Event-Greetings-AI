const request = require("supertest");
const {app,generatePrompt} = require("../server");
const dotenv = require("dotenv");
dotenv.config();

const data = { event: "birthday", age: 10, type: "song", atmosphere: "happy" };

describe("POST /generate-greeting", () => {
  test("should return generate greetings", async () => {
    return request(app)
      .post("/generate-greeting")
      .send(data)
      .expect(200)
  });
});




describe("generatePrompt", () => {
  test("should generate a birthday greeting prompt", () => {
    const params = { event: "birthday", age: 25, relation: null, degree: null, type: null, atmosphere: "fun" };
    const prompt = generatePrompt(params);
    expect(prompt).toContain("Write me a 25-year-old birthday greeting");
    expect(prompt).toContain("in a fun atmosphere");
    expect(prompt).toContain("return 3 greetings in a parsable JSON format");
  });

  test("should generate a wedding greeting prompt", () => {
    const params = { event: "wedding", age: null, relation: "bride", degree: null, type: "formal", atmosphere: null };
    const prompt = generatePrompt(params);
    expect(prompt).toContain("Write me a wedding greeting for the bride");
    expect(prompt).toContain("of type formal");
    expect(prompt).toContain("return 3 greetings in a parsable JSON format");
  });

  test("should generate a graduation greeting prompt", () => {
    const params = { event: "graduation", age: null, relation: null, degree: "Ph.D.", type: null, atmosphere: null };
    const prompt = generatePrompt(params);
    expect(prompt).toContain("Write me a graduation greeting for the graduate with a Ph.D. degree");
    expect(prompt).toContain("return 3 greetings in a parsable JSON format");
  });
  // Add more test cases based on different scenarios and input combinations
});


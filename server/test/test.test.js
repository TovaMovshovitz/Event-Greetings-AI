const request = require("supertest");
const app = require("../server");
const dotenv = require("dotenv");
dotenv.config();

const data = { event: "birthday", age: 10, type: "song", atmosphere: "happy" };

describe("POST /generate-greeting", () => {
  test("should return generate greetings", async () => {
    return request(app)
      .post("/generate-greeting")
      .send(data)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});

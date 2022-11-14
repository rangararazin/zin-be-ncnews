const request = require("supertest");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test-data/index.js");
const app = require("../app");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});

describe("GET /incorrect endpoints", () => {
  test("404 : responds with message route not found", () => {
    return request(app)
      .get("/invalidendpoint")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("URL not found");
      });
  });
});

describe("GET : /api/topics", () => {
  test("should return an array of topics", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(body.topics.length).toBe(3);
        body.topics.forEach((topic) => {
          expect(topic).toMatchObject({
            description: expect.any(String),
            slug: expect.any(String),
          });
        });
      });
  });
});

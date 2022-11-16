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

describe("GET: /incorrect endpoints", () => {
  test("404: responds with message route not found", () => {
    return request(app)
      .get("/invalidendpoint")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("URL not found");
      });
  });
});

describe("GET: /api/topics", () => {
  test("200: should return an array of topics", () => {
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

describe("GET: /api/articles", () => {
  test("200: should return an array of articles", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        body.articles.forEach((article) => {
          expect(article).toMatchObject({
            author: expect.any(String),
            title: expect.any(String),
            article_id: expect.any(Number),
            topic: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            comment_count: expect.any(Number),
          });
        });
      });
  });
  test("200: should return array of article in descending order", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).toBeSortedBy("created_at", { descending: true });
      });
  });
});

describe("GET: /api/articles/:article_id", () => {
  test("200: should return an array of articles of given id", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        expect(body.article).toEqual({
          author: "butter_bridge",
          title: "Living in the shadow of a great man",
          article_id: 1,
          body: "I find this existence challenging",
          topic: "mitch",
          created_at: expect.any(String),
          votes: 100,
        });
      });
  });
  test("404: respond with not found message when valid id but does not exist", () => {
    return request(app)
      .get("/api/articles/45454")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Article not found");
      });
  });
  test("400: returns bad request when passed invalid datatype", () => {
    return request(app)
      .get("/api/articles/badrequest")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
});

describe("GET: /api/articles/:article_id/comments", () => {
  test("200: responds with array of comments of given articel_id", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then((res) => {
        expect(res.body.comments[0].body).toEqual("I hate streaming noses");
        expect(Object.keys(res.body.comments[0])).toEqual([
          "comment_id",
          "votes",
          "created_at",
          "author",
          "body",
        ]);
      });
  });
  test("200: should return array of comments in descending order", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).toBeSortedBy("created_at", { descending: true });
      });
  });

  test("404: respond with not found message when valid id but does not exist", () => {
    return request(app)
      .get("/api/articles/45454/comments")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Article not found");
      });
  });

  test("200: should return empty array when article has no comments", () => {
    return request(app)
      .get("/api/articles/2/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).toEqual([]);
      });
  });
  test("400: returns bad request when passed invalid datatype article_id", () => {
    return request(app)
      .get("/api/articles/not-a-number/comments")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
});

describe("POST: /api/articles/:article_id/comments", () => {
  test("201: responds with new comment", () => {
    return request(app)
      .post("/api/articles/1")
      .send({
        username: "rogersop",
        body: "lorem ipsum roger",
      })
      .expect(201)
      .then(({ body }) => {
        expect(body.comment).toEqual({
          comment_id: expect.any(Number),
          article_id: 1,
          votes: 0,
          created_at: expect.any(String),
          author: "rogersop",
          body: "lorem ipsum roger",
        });
      });
  });

  test("404: if user doesn't exist", () => {
    return request(app)
      .post("/api/articles/1")
      .send({
        username: "unknownuser",
        body: "lorem ipsum roger",
      })
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("User not found");
      });
  });
  test("400: Bad request when posting wrong type of body data", () => {
    return request(app)
      .post("/api/articles/1")
      .send({
        username: "rogersop",
        body: 654654654,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Bad request");
      });
  });
  test("400: returns bad request when passed invalid datatype article_id", () => {
    return request(app)
      .post("/api/articles/not-a-number")
      .send({
        username: "rogersop",
        body: "lorem ipsum roger",
      })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
  test("400: Bad request when posting malformed body", () => {
    return request(app)
      .post("/api/articles/1")
      .send({
        username: "rogersop",
      })
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Bad request");
      });
  });
  test("404: respond with not found message when valid id but article does not exist", () => {
    return request(app)
      .post("/api/articles/45454")
      .send({
        username: "rogersop",
        body: "lorem ipsum roger",
      })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Article not found");
      });
  });
  test("400: Bad request when posting with wrong/misspelled object keys", () => {
    return request(app)
      .post("/api/articles/1")
      .send({
        usernam: "rogersop",
        bo: "lorem ipsum roger",
      })
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Bad request");
      });
  });
});

describe("PATCH: /api/articles/:article_id", () => {
  test("200: responds article with incremental votes", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({
        inc_votes: 5,
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.article).toMatchObject({
          article_id: 1,
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: expect.any(String),
          votes: 105,
        });
      });
  });
  test("200: responds article with decremental votes", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({
        inc_votes: -5,
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.article).toMatchObject({
          article_id: 1,
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: expect.any(String),
          votes: 95,
        });
      });
  });
  test("400: Bad request if inc_votes is not number", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({
        inc_votes: "notnumber",
      })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
  test("400: Bad request when patching with malformed/empty body", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ username: 21321 })
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Bad request");
      });
  });
  test("404: respond with not found message when valid id but article does not exist", () => {
    return request(app)
      .patch("/api/articles/45454")
      .send({
        inc_votes: 10,
      })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Article not found");
      });
  });
  test("400: returns bad request when passed invalid datatype article_id", () => {
    return request(app)
      .patch("/api/articles/not-a-number")
      .send({
        inc_votes: 10,
      })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
  test("400: Bad request when patching with wrong/misspelled object keys", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({
        inc_vots: 10,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Bad request");
      });
  });
});

describe("GET /api/users", () => {
  test("200 : responds with an array of user objects", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        expect(body.users.length).toBe(4);
        body.users.forEach((user) => {
          expect(user).toMatchObject({
            username: expect.any(String),
            name: expect.any(String),
            avatar_url: expect.any(String),
          });
        });
      });
  });
});

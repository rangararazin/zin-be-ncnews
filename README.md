# Zin News API

## Background

We will be building an API for the purpose of accessing application data programmatically. The intention here is to mimic the building of a real world backend service (such as reddit) which should provide this information to the front end architecture.

Our database will be PSQL, and you will interact with it using [node-postgres](https://node-postgres.com/).

- API created using EXPRESS [express](https://expressjs.com/) server for Zin News project, has appropriate error handling and tested with [JEST](https://jestjs.io/) and [SUPERTEST](https://www.npmjs.com/package/supertest) package.
- API is hosted on CYCLIC - https://smoggy-blazer-bee.cyclic.app/api
- Database is hosted on ElephantSQL

## Design/Architecture

- The code has been design using Model View Controller (MVC) architecture.
- The code was developed using Test Driven Development (TDD)

# Endpoints available

The API allows access to the following endpoints. Additional details can be found in "endpoints.json" file.

- ### "GET /api": serves up a json representation of all the available endpoints of the api
- ### "GET /api/topics": serves an array of all topics
- ### "GET /api/articles": serves an array of all articles
- ### "GET /api/articles/:article_id": Serves on object containing the single article
- ### "PATCH /api/articles/:article_id": Increments the votes property on the given article before serving it. Must be sent with an object as described in 'send'. inc_votes will default to 0 if not provided.
- ### "GET /api/articles/:article_id/comments": Serves an array containing the comments for the given article.
- ### "POST /api/articles/:article_id/comments": Posts a comment to the given article. Must be provided an object with 'username' and 'body' properties
- ### "GET /api/users/:username": Serves an array of users
- ### "DELETE /api/comments/:comment_id": Deletes the given comment, with nothing being served in response

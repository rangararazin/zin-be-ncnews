# Zin News API

## Background

We will be building an API for the purpose of accessing application data programmatically. The intention here is to mimic the building of a real world backend service (such as reddit) which should provide this information to the front end architecture.

Our database will be PSQL (version 12.12 or greater), and you will interact with it using [node-postgres](https://node-postgres.com/) (version 19.0.0 or greater).

- API created using EXPRESS [express](https://expressjs.com/) server for Zin News project, has appropriate error handling and tested with [JEST](https://jestjs.io/) and [SUPERTEST](https://www.npmjs.com/package/supertest) package.
- API is hosted on CYCLIC - https://smoggy-blazer-bee.cyclic.app/api
- Database is hosted on ElephantSQL

## Design/Architecture

- The code has been design using Model View Controller (MVC) architecture.
- The code was developed using Test Driven Development (TDD)

## Endpoints available

The API allows access to the following endpoints. Additional details can be found in "endpoints.json" file.

- #### "GET /api": serves up a json representation of all the available endpoints of the api
- #### "GET /api/topics": serves an array of all topics
- #### "GET /api/articles": serves an array of all articles
- #### "GET /api/articles/:article_id": Serves on object containing the single article
- #### "PATCH /api/articles/:article_id": Increments the votes property on the given article before serving it. Must be sent with an object as described in 'send'. inc_votes will default to 0 if not provided.
- #### "GET /api/articles/:article_id/comments": Serves an array containing the comments for the given article.
- #### "POST /api/articles/:article_id/comments": Posts a comment to the given article. Must be provided an object with 'username' and 'body' properties
- #### "GET /api/users/:username": Serves an array of users
- #### "DELETE /api/comments/:comment_id": Deletes the given comment, with nothing being served in response

# Installation

- To clone the project, type in terminal `git clone https://github.com/rangararazin/zin-be-ncnews.git`

- To install dependencies, type in terminal "npm install" which will install all dependencies inside package.json file.

- You will need to create two .env files for your project: .env.test and .env.development.
  Into each, add PGDATABASE=<database_name_here>, with the correct database name for that environment (see /db/setup.sql for the database names). Double check that these .env files are .gitignored.

- You will need to create a connection to the relevant database in a `./db/connection.js` file, and use [dotenv](https://www.npmjs.com/package/dotenv) module that loads environment variables from a `.env` file into the `process.env` files (`.env.test` & `.env.development`) to determine which database to connect to, based on whether you are running your `jest` tests, or running the server manually.

- To set/reset the databases, type in terminal "npm run setup-dbs". This will DROP both the test and development databases (if they exist) and then CREATE for both.

- To seed the development database, type "npm run seed" at the command line. This will remove all previous data from the database if theres any data exist and seed it with new data.

- To run the test suites, use "npm test" at the command line.

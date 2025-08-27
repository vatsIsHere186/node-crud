# Node CRUD

A simple Node.js REST API for managing todos, built with Express.  
Supports create, read, update, and delete operations, with in-memory storage for easy testing and development.

## Features

- Create, read, update, and delete todos
- RESTful endpoints
- In-memory data store (no database required)
- CORS enabled
- Health check endpoint
- Jest + Supertest tests

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/)

### Installation

```sh
npm install
```

### Running the Server

```sh
npm start
```

Server will start on [http://localhost:3000](http://localhost:3000).

For development with auto-reload:

```sh
npm run dev
```

### Running Tests

```sh
npm test
```

## API Endpoints

### Create Todo

`POST /todos`

**Body:**

```json
{ "title": "My task", "done": false }
```

**Response:**

```json
{ "id": 1, "title": "My task", "done": false }
```

### Get All Todos

`GET /todos`

**Response:**

```json
[{ "id": 1, "title": "My task", "done": false }]
```

### Get Single Todo

`GET /todos/:id`

**Response:**

```json
{ "id": 1, "title": "My task", "done": false }
```

### Update Todo

`PUT /todos/:id`

**Body:**

```json
{ "title": "Updated", "done": true }
```

**Response:**

```json
{ "id": 1, "title": "Updated", "done": true }
```

### Delete Todo

`DELETE /todos/:id`

**Response:**

```json
{ "id": 1, "title": "Updated", "done": true }
```

### Health Check

`GET /health`

**Response:**

```json
{ "ok": true }
```

## Project Structure

```
src/
  app.js        # Express app and routes
  server.js     # Server entry point
tests/
  todos.test.js # Jest/Supertest tests
```

# Todolist-API
# Todo List API

A RESTful API for managing todos with support for tags and status tracking.

## Features

- Create, read, update, and delete todos
- Add and manage tags for todos
- Track todo status (OPEN, WORKING, PENDING_REVIEW, etc.)
- Basic authentication
- SQLite database for data persistence

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

- POST /api/todos - Create a new todo
- GET /api/todos - Get all todos
- GET /api/todos/:id - Get a specific todo
- PUT /api/todos/:id - Update a todo
- DELETE /api/todos/:id - Delete a todo

## Testing

Run tests with coverage:
```bash
npm test
```

## Authentication

The API uses Basic Authentication. Default credentials:
- Username: admin
- Password: password

## Project Structure

```
src/
├── controllers/    # Request handlers
├── database/      # Database configuration
├── middleware/    # Custom middleware
├── models/        # Data models
├── routes/        # API routes
├── validators/    # Request validation
└── server.js      # Application entry point
```# Todolist-API


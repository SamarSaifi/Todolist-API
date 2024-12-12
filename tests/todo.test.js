const request = require('supertest');
const app = require('../src/server');
const { db } = require('../src/database/db');

describe('Todo API', () => {
  beforeEach(() => {
    // Clear database before each test
    db.prepare('DELETE FROM todos').run();
    db.prepare('DELETE FROM tags').run();
    db.prepare('DELETE FROM todo_tags').run();
  });

  describe('POST /api/todos', () => {
    it('should create a new todo', async () => {
      const todo = {
        title: 'Test Todo',
        description: 'Test Description',
        dueDate: '2023-12-31',
        tags: ['test', 'important']
      };

      const response = await request(app)
        .post('/api/todos')
        .send(todo)
        .expect(201);

      expect(response.body.title).toBe(todo.title);
      expect(response.body.description).toBe(todo.description);
      expect(response.body.tags).toEqual(todo.tags);
    });
  });

  // Add more tests for other endpoints
});
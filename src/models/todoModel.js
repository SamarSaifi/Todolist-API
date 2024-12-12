const db = require('../database/db');

class TodoModel {
  static create(todo) {
    const { title, description, dueDate, tags, status = 'OPEN' } = todo;
    
    const result = db.run(
      'INSERT INTO todos (title, description, due_date, status) VALUES (?, ?, ?, ?)',
      [title, description, dueDate, status]
    );
    
    const todoId = result.lastInsertRowid;

    if (tags && tags.length > 0) {
      this.addTags(todoId, tags);
    }

    return this.getById(todoId);
  }

  static getById(id) {
    const todo = db.query('SELECT * FROM todos WHERE id = ?', [id]);
    if (Object.keys(todo).length) {
      todo.tags = this.getTodoTags(id);
      return todo;
    }
    return null;
  }

  static getAll() {
    const todos = db.queryAll('SELECT * FROM todos');
    return todos.map(todo => ({
      ...todo,
      tags: this.getTodoTags(todo.id)
    }));
  }

  static update(id, updates) {
    const { title, description, dueDate, status, tags } = updates;
    
    db.run(
      'UPDATE todos SET title = ?, description = ?, due_date = ?, status = ? WHERE id = ?',
      [title, description, dueDate, status, id]
    );

    if (tags) {
      this.updateTags(id, tags);
    }

    return this.getById(id);
  }

  static delete(id) {
    return db.run('DELETE FROM todos WHERE id = ?', [id]);
  }

  static addTags(todoId, tags) {
    for (const tag of tags) {
      db.run('INSERT OR IGNORE INTO tags (name) VALUES (?)', [tag]);
      const tagResult = db.query('SELECT id FROM tags WHERE name = ?', [tag]);
      db.run(
        'INSERT OR IGNORE INTO todo_tags (todo_id, tag_id) VALUES (?, ?)',
        [todoId, tagResult.id]
      );
    }
  }

  static updateTags(todoId, newTags) {
    db.run('DELETE FROM todo_tags WHERE todo_id = ?', [todoId]);
    this.addTags(todoId, newTags);
  }

  static getTodoTags(todoId) {
    const tags = db.queryAll(`
      SELECT tags.name 
      FROM tags 
      JOIN todo_tags ON tags.id = todo_tags.tag_id 
      WHERE todo_tags.todo_id = ?
    `, [todoId]);
    return tags.map(tag => tag.name);
  }
}

module.exports = TodoModel;
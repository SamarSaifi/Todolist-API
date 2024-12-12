const TodoModel = require('../models/todoModel');
const { validateTodo } = require('../validators/todoValidator');

class TodoController {
  static async create(req, res) {
    try {
      const { error } = validateTodo(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const todo = TodoModel.create(req.body);
      res.status(201).json(todo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const todo = TodoModel.getById(req.params.id);
      if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      res.json(todo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAll(req, res) {
    try {
      const todos = TodoModel.getAll();
      res.json(todos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const { error } = validateTodo(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const todo = TodoModel.update(req.params.id, req.body);
      if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      res.json(todo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const result = TodoModel.delete(req.params.id);
      if (!result.changes) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = TodoController;
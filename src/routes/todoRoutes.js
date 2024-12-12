const express = require('express');
const TodoController = require('../controllers/todoController');
const router = express.Router();

router.post('/', TodoController.create);
router.get('/:id', TodoController.getById);
router.get('/', TodoController.getAll);
router.put('/:id', TodoController.update);
router.delete('/:id', TodoController.delete);

module.exports = router;
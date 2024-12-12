const Joi = require('joi');

const todoSchema = Joi.object({
  title: Joi.string().max(100).required(),
  description: Joi.string().max(1000).required(),
  dueDate: Joi.date().iso().allow(null),
  tags: Joi.array().items(Joi.string()).optional(),
  status: Joi.string()
    .valid('OPEN', 'WORKING', 'PENDING_REVIEW', 'COMPLETED', 'OVERDUE', 'CANCELLED')
    .default('OPEN')
});

function validateTodo(todo) {
  return todoSchema.validate(todo);
}

module.exports = {
  validateTodo
};
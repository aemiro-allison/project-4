const express = require('express');
const taskController = require('../controllers/task-controller');

const taskRoutes = express.Router();

taskRoutes.get('/:id', taskController.show);
taskRoutes.get('/', taskController.index);

taskRoutes.post('/', taskController.create);
taskRoutes.put('/:id', taskController.update);

taskRoutes.delete('/:id', taskController.destroy);

module.exports = taskRoutes;

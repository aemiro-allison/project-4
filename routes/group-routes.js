const express = require('express');
const groupController = require('../controllers/group-controller');

const groupRoutes = express.Router();

groupRoutes.get('/:id', groupController.show);
groupRoutes.get('/', groupController.index);

groupRoutes.post('/', groupController.create);
groupRoutes.put('/:id', groupController.update);

groupRoutes.delete('/:id', groupController.destroy);

module.exports = groupRoutes;

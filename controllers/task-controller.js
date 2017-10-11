const Task = require('../models/task');

const taskController = {};

const makeTask = (body, obj = {}) =>
  Object.assign({}, {
    group_id: null,
    id: null,
    priority_lvl: null,
    estimated_time: null,
    attributes: {},
  }, body, obj);

taskController.index = async (req, res, next) => {
  try {
    const tasks = await Task.all();
    res.json({ tasks });
  } catch (e) {
    next(e);
  }
};

taskController.show = async (req, res, next) => {
  try {
    const task = await Task.findOne('id', req.params.id);

    res.json({
      task,
      message: 'Successfully got task.',
    });
  } catch (e) {
    next(e);
  }
};

taskController.create = async (req, res, next) => {
  try {
    const newTask = makeTask(req.body);
    console.log(newTask);

    const task = await Task.create(newTask);
    res.json({
      task,
      message: 'Successfully created task.',
    });
  } catch (e) {
    next(e);
  }
};

taskController.update = async (req, res, next) => {
  try {
    const newTask = makeTask(req.body, {
      id: req.params.id,
    });

    const task = await Task.update(newTask);

    res.json({
      task,
      message: 'Successfully updated task.',
    });
  } catch (e) {
    next(e);
  }
};

taskController.destroy = async (req, res, next) => {
  try {
    await Task.destroy(req.params.id);
    res.json({
      message: 'Successfully deleted task.',
    });
  } catch (e) {
    next(e);
  }
};

module.exports = taskController;

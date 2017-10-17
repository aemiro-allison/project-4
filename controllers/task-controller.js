const Task = require('../models/task');

const taskController = {};

const getNewBody = (body) => {
  const newBody = {
    attributes: {},
    user_id: null,
  };

  Object.keys(body).forEach((prop) => {
    if (prop.includes('attributes.')) {
      const name = prop.replace(/attributes./, '');
      newBody.attributes[name] = body[prop];
    } else if (prop === 'user') {
      newBody.user_id = body[prop].user_id;
    } else {
      newBody[prop] = body[prop];
    }
  });

  return newBody;
};

const makeTask = (body, obj = {}) => {
  const newBody = getNewBody(body);

  return Object.assign({}, {
    group_id: null,
    description: null,
    name: null,
    attributes: {},
  }, newBody, obj);
};

taskController.index = async (req, res, next) => {
  try {
    const tasks = await Task.findAllByUser(req.query.user_id);
    res.json({ tasks });
  } catch (e) {
    next(e);
  }
};

taskController.show = async (req, res, next) => {
  try {
    const task = await Task.findOneByUser(
      req.params.id,
      req.query.user_id,
    );

    res.json({
      task,
      message: 'Successfully got task.',
    });
  } catch (e) {
    console.log(e);
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
    console.log(e);
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

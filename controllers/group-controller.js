const Group = require('../models/group');

const groupController = {};

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

const makeGroup = (body, obj = {}) => {
  const newBody = getNewBody(body);

  return Object.assign({}, {
    name: null,
    description: null,
    attributes: {},
  }, newBody, obj);
};

groupController.index = async (req, res, next) => {
  try {
    const groups = await Group.findAllByUser(req.query.user_id);
    res.json({ groups });
  } catch (e) {
    next(e);
  }
};

groupController.show = async (req, res, next) => {
  try {
    const group = await Group.findOne(
      'id',
      req.params.id,
      req.params.user_id,
    );

    const tasks = await Group.getTasksForOne(
      req.params.id,
      req.params.user_id,
    );

    res.json({
      group,
      tasks,
      message: 'Successfully got group.',
    });
  } catch (e) {
    next(e);
  }
};

groupController.create = async (req, res, next) => {
  try {
    const newGroup = makeGroup(req.body);
    console.log(newGroup);

    const group = await Group.create(newGroup);
    res.json({
      group,
      message: 'Successfully created Group.',
    });
  } catch (e) {
    next(e);
  }
};

groupController.update = async (req, res, next) => {
  try {
    const newGroup = makeGroup(req.body, {
      id: req.params.id,
    });

    const group = await Group.update(newGroup);

    res.json({
      group,
      message: 'Successfully updated group.',
    });
  } catch (e) {
    next(e);
  }
};

groupController.destroy = async (req, res, next) => {
  try {
    await Group.destroy(req.params.id);
    res.json({
      message: 'Successfully deleted group.',
    });
  } catch (e) {
    next(e);
  }
};

module.exports = groupController;

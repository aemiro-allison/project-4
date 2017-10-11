const Group = require('../models/group');

const groupController = {};

const makeGroup = (body, obj = {}) =>
  Object.assign({}, {
    id: null,
    priority_lvl: null,
    estimated_time: null,
    attributes: {},
  }, body, obj);

groupController.index = async (req, res, next) => {
  try {
    const groups = await Group.all();
    res.json({ groups });
  } catch (e) {
    next(e);
  }
};

groupController.show = async (req, res, next) => {
  try {
    const group = await Group.findOne('id', req.params.id);

    res.json({
      group,
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

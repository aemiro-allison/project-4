const bcrypt = require('bcrypt');

const Pass = {};

Pass.comparePass = bcrypt.compare;

Pass.hashPass = bcrypt.hash;

Pass.genSalt = bcrypt.genSalt;

Pass.createPass = async password =>
  Pass.hashPass(password, await Pass.genSalt());

module.exports = Pass;

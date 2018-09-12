/** src/index.js */
const schema = require('./schema');
const tree = require('./tree').tree;
const flat = require('./tree').flat;

function Model() {
  this.schema = schema;
  Model.prototype.tree = tree;
  Model.prototype.flat = flat;
}

module.exports.model = new Model();

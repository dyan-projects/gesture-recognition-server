const glob = require('glob');

const mapRelations = db => {
  return glob
    .sync('./**/*_x_*.js', { cwd: __dirname })
    .map(filename => require(filename))
    .reduce((db, relation) => relation(db), db);
};

module.exports = mapRelations;

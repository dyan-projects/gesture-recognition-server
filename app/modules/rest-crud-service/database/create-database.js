const { Sequelize } = require('sequelize');
const glob = require('glob');
const path = require('path');
const mapRelations = require('./relations/create-relations');

// user and password not needed for sqlite
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const DB_PATH = process.env.SQLITE_STORAGE_OPTION || './data/db/db.sqlite';

module.exports = ({ logger }) => {
  const sequelize = new Sequelize('database', USER, PASSWORD, {
    dialect: 'sqlite',
    storage: DB_PATH,
    logging: logger.debug.bind(logger),
    define: {
      freezeTableName: true,
    },
  });

  const db = mapRelations(
    glob
      .sync('./models/**/*.js', { cwd: __dirname })
      .map(filename => {
        return {
          model: require(filename)(sequelize),
          name: path.basename(filename).replace(path.extname(filename), ''),
        };
      })
      .reduce((db, model) => {
        return {
          ...db,
          [model.name]: model.model,
        };
      }, {}),
  );

  try {
    sequelize.sync().then(() => {
      sequelize.authenticate().then(() => {
        logger.info('Connected to database');
      });
    });
  } catch (err) {
    logger.error('Unable to connect to the database: ', err);
  }

  return db;
};

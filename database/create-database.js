const { Sequelize } = require('sequelize');
const glob = require('glob');
const path = require('path');
const mapRelations = require('./relations-mapping');

const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const DB_PATH = process.env.DB_PATH;

module.exports = async ({ logger }) => {
  const sequelize = new Sequelize('database', USER, PASSWORD, {
    dialect: 'sqlite',
    storage: path.join(DB_PATH, 'db.sqlite'),
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
          [model.name.toLowerCase()]: model,
        };
      }, {}),
  );

  try {
    sequelize.sync({ alter: true });
    await sequelize.authenticate().then(() => {
      logger.info('Connection to database has been established successfully.');
    });
  } catch (err) {
    logger.error('Unable to connect to the database: ', err);
  }

  console.log(db);
  return db;
};

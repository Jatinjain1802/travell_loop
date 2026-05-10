const path = require('path');
const { Umzug, SequelizeStorage } = require('umzug');
const sequelize = require('../config/db');

function createMigrator() {
  return new Umzug({
    migrations: { glob: path.join(__dirname, 'migrations', '*.js') },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize, tableName: 'sequelize_meta' }),
    logger: console
  });
}

module.exports = createMigrator;

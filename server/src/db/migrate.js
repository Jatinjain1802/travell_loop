const sequelize = require('../config/db');
const createMigrator = require('./migrator');

async function run() {
  await sequelize.authenticate();
  const migrator = createMigrator();
  const migrations = await migrator.up();
  console.log('Applied migrations:', migrations.map((m) => m.name));
  await sequelize.close();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

const bcrypt = require('bcryptjs');
const sequelize = require('../config/db');

async function run() {
  await sequelize.authenticate();

  const passwordHash = await bcrypt.hash('Admin@12345', 10);
  await sequelize.getQueryInterface().bulkInsert('users', [{
    first_name: 'System',
    last_name: 'Admin',
    email: 'admin@traveloop.local',
    password_hash: passwordHash,
    role: 'admin',
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  }], { ignoreDuplicates: true });

  console.log('Seed complete');
  await sequelize.close();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

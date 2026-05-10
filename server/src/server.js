const app = require('./app');
const env = require('./config/env');
const sequelize = require('./config/db');
require('./models');

async function bootstrap() {
  try {
    await sequelize.authenticate();

    if (env.autoSync) {
      await sequelize.sync();
    }

    app.listen(env.port, () => {
      console.log(`Server running on port ${env.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
}

bootstrap();

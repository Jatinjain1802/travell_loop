const app = require('./app');
const env = require('./config/env');
const sequelize = require('./config/db');
require('./models');

async function bootstrap() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    app.listen(env.port, () => {
      // eslint-disable-next-line no-console
      console.log(`Server running on port ${env.port}`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
}

bootstrap();

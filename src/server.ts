import app from './app';
import connectToDatabase from './config/database';
import config from './config/vars';
import logger from './utils/logger';

connectToDatabase().then(() => {
  app.listen(config.port || 3000, () => {
    logger.info(`App Run In Port ${config.port}`);
  });
});

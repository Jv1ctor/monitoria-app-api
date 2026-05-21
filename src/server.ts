import { app } from './app';
import { logger } from './shared/logger';

const port = process.env.PORT_API || 3000;

app.listen(port, () => {
  logger.info(`server initialized in ${port} listening...`);
});

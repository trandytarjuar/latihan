import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import methodOverride from 'method-override';
import logger from './utils/logger';
import router from './routes';
import errorHandler from './middleware/errorHandlerMiddleware';
import notFoundMiddleware from './middleware/notFoundMiddleware';
import path from 'path';
import { setupSwagger } from './utils/swagger';

const app = express();

app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
const imagesPath = path.join(__dirname, 'uploads/images');

app.use('/uploads/images', express.static(imagesPath));

app.get('/', (_req: express.Request, res: express.Response) => {
  return res.json({
    status: 200,
    message: 'Event APP API',
    data: null,
  });
});

app.use('/api', router);
setupSwagger(app);

app.use(errorHandler);
app.use(notFoundMiddleware);

export default app;

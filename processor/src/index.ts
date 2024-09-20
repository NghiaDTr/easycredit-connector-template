import * as dotenv from 'dotenv';
dotenv.config();

import express, { Express } from 'express';
import bodyParser from 'body-parser';

// Import routes
import ProcessorRoutes from './routes/processor.route';

// Import logger
import { logger } from './utils/logger.utils';

import { readConfiguration } from './utils/config.utils';
import { errorMiddleware } from './middleware/error.middleware';

import cors from 'cors';

// Read env variables
readConfiguration();

const PORT = 8188;

// Create the express app
const app: Express = express();
app.disable('x-powered-by');

// Define configurations
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  origin: '*', // Allow requests from your FE
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// Define routes
app.use('/processor', ProcessorRoutes);

// Global error handler
app.use(errorMiddleware);

// Listen the application
const server = app.listen(PORT, () => {
  logger.info(`⚡️ Service application listening on port ${PORT}`);
});

export default server;

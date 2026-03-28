import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import express from 'express';

import aiRoutes from './routes/ai.route.js';
import { errorMiddleware } from './middleware/error.middleware.js';

config();

const app = express();
const CORS_ORIGIN = process.env.CORS_ORIGIN;
const MAX_REQ_BODY_SIZE = '1mb';

// Middleware
app.use(express.json({ limit: MAX_REQ_BODY_SIZE }));
app.use(express.urlencoded({ limit: MAX_REQ_BODY_SIZE, extended: true }));

app.use(cookieParser());
app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);
// Routes
app.use('/api/ai', aiRoutes);

// Error Middleware
app.use(errorMiddleware);

if (process.env.NODE_ENV == 'development') {
  const PORT = process.env.PORT || '5001';

  app.listen(PORT, () => {
    console.log('server is running at port: ' + PORT);
  });
}

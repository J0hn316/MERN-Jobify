import 'express-async-errors';
import express from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';

// routers
import jobRouter from './routers/jobRouter.js';
import authRouter from './routers/authRouter.js';

// middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';

dotenv.config();

const port = process.env.PORT || 5100;
const app = express();

app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api/v1/jobs', jobRouter);
app.use('/api/v1/auth', authRouter);

// This route needs to be at the end of all routes
app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' });
});

// This route needs to be the very last to check errors
app.use(errorHandlerMiddleware);

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}

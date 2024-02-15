import 'express-async-errors';
import express from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import jobRouter from './routers/jobRouter.js';

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

app.post('/', (req, res) => {
  console.log(req);
  res.json({ message: 'data received', data: req.body });
});

app.use('/api/v1/jobs', jobRouter);

// This route needs to be at the end of all routes
app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' });
});

// This route needs to be the very last to check errors
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ msg: 'something went wrong' });
});

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}

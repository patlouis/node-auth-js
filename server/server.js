import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import authRouter from './routes/authRoutes.js';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to the User Authentication Server!');
});

app.use('/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
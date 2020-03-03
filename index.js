import express from 'express';
import cors from 'cors';
const PORT = process.env.PORT || 5000;
const app = express();
import mongoose from './config/mongoose';
import router from './router';
import errorHandler from './utils/errorHandler';

app.use(cors());
app.use(express.json());
app.use('/api', router);
app.use(errorHandler);

app.listen(PORT, () => console.log(`listen on ${PORT}`));
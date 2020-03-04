import express from 'express';
import cors from 'cors';
import init from './config/mongoose';
import router from './router';
import errorHandler from './utils/errorHandler';

init();
const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(errorHandler);

app.listen(PORT, () => console.log(`listen on ${PORT}`));
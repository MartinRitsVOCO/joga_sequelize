import express, { json, urlencoded } from 'express';

import articleRouter from './routes/article.js';

const app = express();
const _PORT = 3000;

app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/', articleRouter);

app.listen(_PORT, () => {
    console.log(`Server is running on http://localhost:${_PORT}`);
});
import express, { json, urlencoded } from 'express';

import articleRouter from './routes/article.js';
import authorRouter from './routes/author.js';

const app = express();
const _PORT = 3000;

app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/api/article', articleRouter);
app.use('/api/author', authorRouter);

app.listen(_PORT, () => {
    console.log(`Server is running on http://localhost:${_PORT}`);
});
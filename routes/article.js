import Express from 'express';
const router = Express.Router();

import articleController from '../controllers/article.js';

router.get('/', articleController.getAll);

export default router;
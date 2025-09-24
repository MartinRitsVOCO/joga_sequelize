import Express from 'express';
const router = Express.Router();

import articleController from '../controllers/article.js';

router.get('/', articleController.getAll);
router.get('/slug/:slug', articleController.getBySlug);

export default router;
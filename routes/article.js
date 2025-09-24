import Express from 'express';
const router = Express.Router();

import articleController from '../controllers/article.js';
import adminArticleController from '../controllers/admin/article.js';

router.get('/', articleController.getAll);
router.get('/slug/:slug', articleController.getBySlug);
router.post('/admin/add', adminArticleController.create);
router.delete('/admin/delete/:id', adminArticleController.delete);
router.put('/admin/update/:id', adminArticleController.update);

export default router;
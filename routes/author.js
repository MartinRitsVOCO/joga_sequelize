import Express from 'express';
const router = Express.Router();

import authorController from '../controllers/author.js';

router.get('/id/:id', authorController.getAllByPK);

export default router;
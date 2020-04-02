import PromiseRouter from 'express-promise-router';
import * as posts from '../controllers/posts-controller';
import guard from '../middlewares/guard-middleware';
import createValidator from '../validation/create-validator';
import { postSchema, deletePostSchema } from '../validation/validationSchemas';

const router = PromiseRouter();

router.get('/', guard, posts.show);
router.get('/:username', guard, posts.show);
router.post('/', guard, createValidator(postSchema), posts.store);
router.delete('/:id', guard, createValidator(null, deletePostSchema), posts.destroy);

export default router;

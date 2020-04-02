import PromiseRouter from 'express-promise-router';
import * as posts from '../controllers/posts-controller';
import guard from '../middlewares/guard-middleware';
import createValidator from '../validation/create-validator';
import {
  postSchema,
  deletePostSchema,
  hashTagsAutocompleteSchema
} from '../validation/validationSchemas';

const router = PromiseRouter();

router.get('/:username', guard, posts.show); //todo hashtags
router.post('/', guard, createValidator(postSchema), posts.store);
router.delete('/:id', guard, createValidator(null, deletePostSchema), posts.destroy);

router.get(
  '/autocomplete/',
  guard,
  createValidator(null, null, hashTagsAutocompleteSchema),
  posts.autocomplete
);

export default router;

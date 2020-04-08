import PromiseRouter from 'express-promise-router';
import * as hashtags from '../controllers/hashtags-controller';
import guard from '../middlewares/guard-middleware';
import createValidator from '../validation/create-validator';
import { hashTagsAutocompleteSchema } from '../validation/validationSchemas';

const router = PromiseRouter();

router.get(
  '/autocomplete/:hashtag',
  guard,
  createValidator(null, null, hashTagsAutocompleteSchema),
  hashtags.autocomplete
);

export default router;
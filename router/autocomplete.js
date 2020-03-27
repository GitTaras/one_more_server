import express from 'express';
import { getUsersAutocomplete } from '../controllers/autocomplete-controller';
import guard from '../middlewares/guard-middleware';
import createValidator from '../utils/create-validator';
import { usersAutocompleteSchema } from '../utils/validationShemes';

const router = express.Router();

router.get(
  '/users/',
  guard,
  createValidator(null, null, usersAutocompleteSchema),
  getUsersAutocomplete
);

export default router;

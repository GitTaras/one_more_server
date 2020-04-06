import PromiseRouter from 'express-promise-router';
import * as users from '../controllers/users-controller';
import guard from '../middlewares/guard-middleware';
import createValidator from '../validation/create-validator';
import { editUserSchema, usersAutocompleteSchema, updatePasswordSchema } from '../validation/validationSchemas';

const router = PromiseRouter();

router.put('/', guard, createValidator(editUserSchema), users.update);

router.get(
  '/autocomplete/',
  guard,
  createValidator(null, null, usersAutocompleteSchema),
  users.autocomplete
);

router.put('/update-password', guard, createValidator(updatePasswordSchema), users.update);

export default router;

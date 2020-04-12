import PromiseRouter from 'express-promise-router';
import * as users from '../controllers/users-controller';
import { upload } from '../middlewares/file-middleware';
import { guard } from '../middlewares/guard-middleware';
import { createValidator } from '../validation/create-validator';
import {
  editUserSchema,
  usersAutocompleteSchema,
  updatePasswordSchema,
  avatarSchema,
} from '../validation/validationSchemas';

const router = PromiseRouter();

router.put('/', /*upload.single('avatar'),*/ guard, createValidator(editUserSchema), users.update);

router.get(
  '/autocomplete/:name',
  guard,
  createValidator(null, null, usersAutocompleteSchema),
  users.autocompleteUsername
);

router.put('/update-password', guard, createValidator(updatePasswordSchema), users.update);
router.put(
  '/update-avatar',
  upload.single('avatar'),
  guard,
  createValidator(avatarSchema),
  users.update
);

export default router;

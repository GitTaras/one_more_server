import PromiseRouter from 'express-promise-router';
import * as users from '../controllers/users-controller';
import { guard }from '../middlewares/guard-middleware';
import { createValidator } from '../validation/create-validator';
import { signInSchema, signUpSchema } from '../validation/validationSchemas';

const router = PromiseRouter();

router.post('/sign-in', createValidator(signInSchema), users.signIn);
router.post('/sign-up', createValidator(signUpSchema), users.store);
router.get('/get-user', guard, users.show);

export default router;

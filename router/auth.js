import express from 'express';
import * as user from '../controllers/auth-controller';
import guard from '../middlewares/guard-middleware';
import createValidator from '../utils/create-validator';
import { signInSchema, signUpSchema, editUserSchema } from '../utils/validationShemes';

const router = express.Router();

router.post('/signin', createValidator(signInSchema), user.login);
router.post('/signup', createValidator(signUpSchema), user.createUser);
router.get('/get-user', guard, user.getCurrentUser);
router.put('/', guard, createValidator(editUserSchema), user.update);

export default router;

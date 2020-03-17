import express from 'express';
import * as user from '../controllers/auth-controller';
import guard from '../controllers/guard-controller';
import createValidator from '../utils/create-validator';
import {signInSchema, signUpSchema} from "../utils/validationShemes";

const router = express.Router();

router.post('/signin', createValidator(signInSchema), user.login);
router.post('/signup', createValidator(signUpSchema), user.createUser);
router.get('/get-user', guard, user.getCurrentUser);

export default router;
import express from 'express';
import * as user from '../controllers/auth-controller';
import { validatorSignIn, validatorSignUp } from '../utils/validators';
import guard from '../controllers/guard-controller';

const router = express.Router();

router.post('/signin', validatorSignIn, user.login);
router.post('/signup', validatorSignUp, user.createUser);
router.get('/get-user', guard, user.getCurrentUser);

export default router;
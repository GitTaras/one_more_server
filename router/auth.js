import express from 'express';
import * as user from '../controllers/auth-controller';
import { yupValidatorSignIn, yupValidatorSignUp } from '../utils/validators';
import checkToken from '../utils/checkToken';

const router = express.Router();

router.post('/signin', yupValidatorSignIn, user.login);
router.post('/signup', yupValidatorSignUp, user.createUser);
router.get('/get-user', checkToken, user.getCurrentUser);

export default router;
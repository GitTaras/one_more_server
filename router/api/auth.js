import express from 'express';
import user from '../../controllers/authController';
import { yupValidationSignIn, yupValidationSignUp } from '../../utils/validators';
import checkToken from '../../utils/checkToken';

const router = express.Router();

router.post('/signin', yupValidationSignIn, user.login);
router.post('/signup', yupValidationSignUp, user.createUser);
router.get('/get-user', checkToken, user.getCurrentUser);

export default router;
import chat from './chat';
import auth from './auth';
import PromiseRouter from 'express-promise-router';

const router = PromiseRouter();

router.use('/chat', chat);
router.use('/auth', auth);

export default router;
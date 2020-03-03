import express from 'express';
import chat from './api/chat';
import auth from './api/auth';

const router = express.Router();

router.use('/chat', chat);
router.use('/auth', auth);

export default router;
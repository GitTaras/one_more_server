import express from 'express';
import chat from './api/chat';

const router = express.Router();

router.use('/chat', chat);

export default router;
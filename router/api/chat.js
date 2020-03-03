import express from 'express';
import chat from '../../controllers/chatController';
import { yupValidatorPostMessage } from '../../utils/validators';

const router = express.Router();

router.get('/', chat.getAllMessages);
router.post('/', yupValidatorPostMessage, chat.postMessage);
router.delete('/:id', yupValidatorDeleteMessage, chat.deleteMessage);

export default router;
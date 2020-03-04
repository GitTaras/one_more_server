import * as chat from '../controllers/chat-controller';
import { yupValidatorPostMessage, yupValidatorDeleteMessage } from '../utils/validators';
import PromiseRouter from 'express-promise-router';

const router = PromiseRouter();

router.get('/', chat.getAllMessages);
router.post('/', yupValidatorPostMessage, chat.postMessage);
router.delete('/:id', yupValidatorDeleteMessage, chat.deleteMessage);

export default router;
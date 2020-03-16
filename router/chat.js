import * as chat from '../controllers/chat-controller';
import { validatorPostMessage, validatorDeleteMessage } from '../utils/validators';
import guard from '../controllers/guard-controller';
import PromiseRouter from 'express-promise-router';

const router = PromiseRouter();

router.get('/', guard,  chat.getAllMessages);
router.post('/', guard, validatorPostMessage, chat.postMessage);
router.delete('/:id', guard, validatorDeleteMessage, chat.deleteMessage);

export default router;
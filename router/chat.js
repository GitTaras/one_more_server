import * as chat from '../controllers/chat-controller';
import { yupValidatorPostMessage, yupValidatorDeleteMessage } from '../utils/validators';
import checkToken from '../utils/checkToken';
import PromiseRouter from 'express-promise-router';

const router = PromiseRouter();

router.get('/', checkToken,  chat.getAllMessages);
router.post('/', checkToken, yupValidatorPostMessage, chat.postMessage);
router.delete('/:id', checkToken, yupValidatorDeleteMessage, chat.deleteMessage);

export default router;
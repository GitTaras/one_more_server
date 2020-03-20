import * as chat from '../controllers/chat-controller';
import PromiseRouter from 'express-promise-router';
import guard from '../middlewares/guard-middleware';
import createValidator from '../utils/create-validator';
import {postMessageSchema, deleteMessageSchema} from "../utils/validationShemes";

const router = PromiseRouter();

router.get('/', guard,  chat.getAllMessages);
router.post('/', guard, createValidator(postMessageSchema), chat.postMessage);
router.delete('/:id', guard, createValidator(null, deleteMessageSchema), chat.deleteMessage);

export default router;
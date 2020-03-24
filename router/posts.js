import * as posts from '../controllers/posts-controller';
import PromiseRouter from 'express-promise-router';
import guard from '../middlewares/guard-middleware';
import createValidator from '../utils/create-validator';
import {postMessageSchema, deleteMessageSchema} from "../utils/validationShemes";

const router = PromiseRouter();

router.get('/', guard,  posts.getAllMessages);
router.post('/', guard, createValidator(postMessageSchema), posts.postMessage);
router.delete('/:id', guard, createValidator(null, deleteMessageSchema), posts.deleteMessage);

export default router;
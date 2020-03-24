import posts from './posts';
import auth from './auth';
import autocomplete from './autocomplete';
import PromiseRouter from 'express-promise-router';

const router = PromiseRouter();

router.use('/posts', posts);
router.use('/auth', auth);
router.use('/autocomplete', autocomplete);

export default router;
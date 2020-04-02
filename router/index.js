import PromiseRouter from 'express-promise-router';
import posts from './posts';
import auth from './auth';
import users from './users';
// import hashtags from './hashtags';

const router = PromiseRouter();

router.use('/posts', posts);
router.use('/auth', auth);
router.use('/users', users);
// router.use('/hashtags', hashtags);

export default router;

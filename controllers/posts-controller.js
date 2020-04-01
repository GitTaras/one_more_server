import mongoose from 'mongoose';
import Posts from '../models/Post';
import Users from '../models/User';
import BadReqError from '../utils/errors/BadRequestError';

export const show = async (req, res, next) => {
  try {
    const { page = 1 } = req.query;
    const author = req.params.username
      ? (await Users.findOne({ username: req.params.username })).id
      : req.user.id;

    const posts = await Posts.paginate({ author }, { sort: { _id: -1 }, page, limit: 15 });
    posts.nextPage = +posts.page + 1;
    res.json(posts);
  } catch (err) {
    next(new BadReqError());
  }
};

export const store = async (req, res, next) => {
  try {
    const { message } = req.body;
    const post = await Posts.create({ author: req.user.id, message });
    await req.user.posts.push(post.id);

    res.json(post).status(200);
  } catch (err) {
    next(new BadReqError());
  }
};

export const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await Posts.findOneAndDelete({
      _id: mongoose.Types.ObjectId(id),
      author: req.user.id,
    });
    if (!result) {
      return next(new BadReqError());
    }

    res.sendStatus(200);
  } catch (err) {
    next(new BadReqError());
  }
};

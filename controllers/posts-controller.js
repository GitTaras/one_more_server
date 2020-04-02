import { Types } from 'mongoose';
import Posts from '../models/Post';
import Users from '../models/User';
import BadReqError from '../utils/errors/BadRequestError';

export const show = async (req, res) => {
  const { page = 1, hash_tag = undefined } = req.query;
  const { username } = req.params;

  const query = {};

  if (hash_tag) {
    query.hashtags = hash_tag;
  }

  if (username) {
    query.author = req.params.username
      ? (await Users.findOne({ username: req.params.username })).id
      : req.user.id;
  }

  const posts = await Posts.paginate(query, { sort: { _id: -1 }, page, limit: 15 });
  posts.nextPage = +posts.page + 1;
  res.json(posts);
};

export const store = async (req, res) => {
  const { message } = req.body;
  const post = await Posts.create({ author: req.user.id, message });
  await req.user.posts.push(post.id);
  await req.user.save();

  res.json(post).status(200);
};

export const destroy = async (req, res) => {
  const { id } = req.params;

  const result = await Posts.findOneAndDelete({
    _id: Types.ObjectId(id),
    author: req.user.id,
  });

  if (!result) throw new BadReqError();

  res.sendStatus(200);

  const index = req.user.posts.findIndex((el) => el.equals(Types.ObjectId(id)));
  if (index !== -1) {
    req.user.posts.splice(index, 1);
    await req.user.save();
  }
};
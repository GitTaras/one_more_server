import Messages from '../models/Message';
import Users from '../models/User';
import BadReqError from '../utils/errors/BadRequestError';
import mongoose from '../config/mongoose';

export const getMessages = async (req, res, next) => {
  try {
    let { page = 1, username } = req.query;
    let author = '';

    if (username) {
      author = await Users.findOne({ username }, { id: 1 });
    } else {

      author = req.currentUser.id;
    }

    const messages = await Messages.paginate(
      { author },
      { sort: { _id: -1 }, page, limit: 15 }
    );
    messages.nextPage = +messages.page + 1;
    res.send(messages);
  } catch (err) {
    next(new BadReqError());
  }
};

export const postMessage = async (req, res, next) => {
  try {
    const { message } = req.body;
    const newMessage = await Messages.create({ author: req.currentUser.id, message });
    res.send(newMessage).status(200);
  } catch (err) {
    next(new BadReqError());
  }
};

export const deleteMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const db = await mongoose;

    const result = await Messages.findOneAndDelete({
      _id: new db.Types.ObjectId(id),
      author: req.currentUser.id,
    });
    if (!result) {
      return next(new BadReqError());
    }
    res.sendStatus(200);
  } catch (err) {
    next(new BadReqError());
  }
};

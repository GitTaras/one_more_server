import Messages from '../models/messages';
import BadReqError from '../utils/errors/BadRequestError';
import _ from "lodash";
import mongoose from '../config/mongoose';

export const getAllMessages = async (req, res, next) => {
  try {
    let page = parseInt(_.get(req, 'query.page', 1), 10);
    const messages  = await Messages.paginate({author: req.currentUser.id}, {sort: {$natural: -1} , page, limit: 15});
    messages.nextPage = messages.page + 1;
    messages.docs.reverse();
    res.send(messages);
  } catch (err) {
    next(new BadReqError());
  }
};

export const postMessage = async (req, res, next) => {
  try {
    const { message }  = req.body;
    const newMessage = new Messages({ author: req.currentUser.id, message });
    await newMessage.save();
    res.send(newMessage).status(200);
  } catch (err) {
    next(new BadReqError());
  }
};

export const deleteMessage = async (req, res, next) => {
  try {
    const { id }  = req.params;
    const db = await mongoose;

    let result = await Messages.findOneAndDelete({_id: new db.Types.ObjectId(id), author: req.currentUser.id});
    console.log(result);
    if (!result) {
     return next(new BadReqError());
    }
    res.sendStatus(200);
  } catch (err) {
    next(new BadReqError());
  }
};

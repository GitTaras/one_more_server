import Messages from '../models/Messages.model';
import NotFoundError from '../utils/errors/NotFoundError';
import BadReqError from '../utils/errors/BadRequestError';
import _ from "lodash";
import mongoose from "../config/mongoose";

module.exports.getAllMessages = async (req, res, next) => {
  try {
    let offset = parseInt(_.get(req, 'query.offset', 0), 10);
    let limit = parseInt(_.get(req, 'query.limit', 15), 10);

    const length = await Messages.estimatedDocumentCount();
    const hasMore = length > offset + limit;

    const messages  = hasMore ?  await Messages.find({}, null, {skip: length - offset - limit, limit}) : await Messages.find({}, null, {limit: length - offset});
    res.send({messages, hasMore});
  } catch (err) {
    next(new BadReqError());
  }
};

module.exports.postMessage = async (req, res, next) => {
  try {
    const { message }  = req.body;
    const newMessage = new Messages({ message });
    await newMessage.save();
    res.send(newMessage).status(200);
  } catch (err) {
    next(new BadReqError());
  }
};

module.exports.deleteMessage = async (req, res, next) => {
  try {
    const { id }  = req.params;
    let result = await Messages.findByIdAndDelete(new mongoose.Types.ObjectId(id));

    if (!result._id) {
      next(new BadReqError());
    }

    res.sendStatus(200);
  } catch (err) {
    next(new BadReqError());
  }
};

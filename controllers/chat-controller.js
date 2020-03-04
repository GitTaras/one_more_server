import Messages from '../models/messages-schemal';
import NotFoundError from '../utils/errors/NotFoundError';
import BadReqError from '../utils/errors/BadRequestError';
import _ from "lodash";
import mongoose from "../config/mongoose";

export const getAllMessages = async (req, res, next) => {
  try {
    let page = parseInt(_.get(req, 'query.page', 1), 10);
    let limit = parseInt(_.get(req, 'query.limit', 15), 10);

    const length = await Messages.estimatedDocumentCount();
    const hasMore = length > offset + limit;
    const messages  = hasMore ?  await Messages.find({}, null, {skip: length - offset - limit, limit}) : await Messages.find({}, null, {limit: length - offset});

    // const query = new mongoose.Query();
    // query.sort({createdAt: 1});
    //  const messages  = await Messages.paginate({}, {sort: { $natural: -1, _id: 1 }, page, limit});
    res.send(messages);
  } catch (err) {
    console.log(err)

    next(new BadReqError());
  }
};

export const postMessage = async (req, res, next) => {
  try {
    const { message }  = req.body;
    const newMessage = new Messages({ message });
    await newMessage.save();
    res.send(newMessage).status(200);
  } catch (err) {
    next(new BadReqError());
  }
};

export const deleteMessage = async (req, res, next) => {
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

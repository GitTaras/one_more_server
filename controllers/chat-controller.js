import Messages from '../models/messages-schemal';
import BadReqError from '../utils/errors/BadRequestError';
import _ from "lodash";
//const a = (async function () {return await(await import('../config/mongoose')).default()})();
//const mongoosex = require('mongoose');

export const getAllMessages = async (req, res, next) => {
  try {
    let page = parseInt(_.get(req, 'query.page', 1), 10);

    const messages  = await Messages.paginate({}, {sort: {$natural: -1} , page, limit: 15});
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
    // console.log("here", id);
    // console.log(await a.Schema() );
    // const j = await mongoose();
    // console.log("here06");
    // console.log(j.Types.ObjectId(id));
    // console.log("here1");
    // console.log(mongoosex);
    // console.log("here2");
    // console.log(new mongoosex.Types.ObjectId(id));
    // console.log("here3");
    // console.log(mongoose().Types.ObjectId(id));
    // res.sendStatus(200);
    let result = await Messages.findByIdAndDelete(new mongoose().Types.ObjectId(id));
    console.log(result);
    if (!result._id) {
      next(new BadReqError());
    }
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    next(new BadReqError());
  }
};

import Users from '../models/User';
import BadReqError from '../utils/errors/BadRequestError';

export const getUsersAutocomplete = async (req, res, next) => {
  try {
    //console.log(typeof req.query.limit);
    //here is string ? wtf
    //and this query will falling down ...oh my fucking London Bridge ...
    const users  = await Users.find({username: new RegExp(`^${req.query.name}`,'ig')}, {username: 1}, {limit: parseInt(req.query.limit, 10)});
    res.send(users);
  } catch (err) {
    console.log(err);
    next(new BadReqError());
  }
};
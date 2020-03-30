import Users from '../models/User';
import BadReqError from '../utils/errors/BadRequestError';

export const getUsersAutocomplete = async (req, res, next) => {
  try {
    const { limit = 15 } = req.query.limit;
    const regexp = new RegExp(`^${req.query.name}`, 'ig');
    const users = await Users.find(
      { $or: [{ username: regexp }, { fullName: regexp }] },
      { username: 1, email: 1, id: 1, fullName: 1 },
      { limit: limit }
    );
    res.send(users);
  } catch (err) {
    next(new BadReqError());
  }
};

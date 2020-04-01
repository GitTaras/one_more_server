import jwt from 'jsonwebtoken';
import Users from '../models/User';
import ApplicationError from '../utils/errors/ApplicationError';
import mongoose from '../config/mongoose';

const { KEY_TOKEN } = process.env;

export default async (req, res, next) => {
  try {
    const db = await mongoose;
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = await jwt.verify(token, KEY_TOKEN);
      const user = await Users.findById(new db.Types.ObjectId(decoded._id));

      if (!user) {
        return next(new ApplicationError('Unauthorized', 401));
      }

      req.user = user;
      req.token = token;

      return next();
    }
    return next(new ApplicationError('Unauthorized', 401));
  } catch (err) {
    return next(new ApplicationError('Unauthorized ', 401));
  }
};

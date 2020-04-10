import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import Users from '../models/User';
import ApplicationError from '../utils/errors/ApplicationError';

const { KEY_TOKEN } = process.env;

export const guard = async (req, res, next) => {
  if (!req.headers.authorization) {
    throw new ApplicationError('Unauthorized', 401);
  }
  const token = req.headers.authorization.split(' ')[1];
  const decoded = await jwt.verify(token, KEY_TOKEN);
  const user = await Users.findById(Types.ObjectId(decoded._id));

  if (!user) {
    throw new ApplicationError('Unauthorized', 401);
  }

  req.user = user;
  req.token = token;

  next();
};

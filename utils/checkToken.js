import jwt from 'jsonwebtoken';
import { KEY_TOKEN } from './constants';
import UserSchema from '../models/user-schema';
import ApplicationError from './errors/ApplicationError';
import mongoose from "../config/mongoose";

export default async (req, res, next) => {
  try {
    if(req.headers.authorization){
      const token = req.headers.authorization.split(' ')[1];
      const decoded = await jwt.verify(token, KEY_TOKEN);
      const user = await UserSchema.findById(new mongoose.Types.ObjectId(decoded._id));
      req._id = user._id;
      return next();
    } else {
      return res.end();
    }
  } catch (err) {
    return next(new ApplicationError('Unauthorized ', 401));
  }
};
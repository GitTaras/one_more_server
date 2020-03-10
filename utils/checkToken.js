import jwt from 'jsonwebtoken';
import { KEY_TOKEN } from './constants';
import UserSchema from '../models/user-schema';
import ApplicationError from './errors/ApplicationError';
import mongoose from "../config/mongoose";

export default async (req, res, next) => {
  try {
    let db = await mongoose;
    if(req.headers.authorization){
      const token = req.headers.authorization.split(' ')[1];
      const decoded = await jwt.verify(token, KEY_TOKEN);
      const user = await UserSchema.findById(new db.Types.ObjectId(decoded._id));
      req._id = user._id;
      req.token = token;
      return next();
    }
    return next(new ApplicationError('Unauthorized', 401));

  } catch (err) {
    console.log(err);
    return next(new ApplicationError('Unauthorized ', 401));
  }
};
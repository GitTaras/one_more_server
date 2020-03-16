import jwt from 'jsonwebtoken';
import { KEY_TOKEN } from '../utils/constants';
import UserSchema from '../models/users';
import ApplicationError from '../utils/errors/ApplicationError';
import mongoose from "../config/mongoose";

export default async (req, res, next) => {
  try {
    let db = await mongoose;
    if(req.headers.authorization){
      const token = req.headers.authorization.split(' ')[1];
      const decoded = await jwt.verify(token, KEY_TOKEN);
      const user = await UserSchema.findById(new db.Types.ObjectId(decoded._id));

      if( !user ) {
        return next(new ApplicationError('Unauthorized', 401));
      }

      req.currentUser = user;
      req.token = token;

      return next();
    }
    return next(new ApplicationError('Unauthorized', 401));

  } catch (err) {
    console.log(err);
    return next(new ApplicationError('Unauthorized ', 401));
  }
};
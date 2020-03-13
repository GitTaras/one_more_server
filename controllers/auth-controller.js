import UserSchema from '../models/user-schema';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { KEY_TOKEN, expiresToken } from '../utils/constants';
import NotFoundError from '../utils/errors/NotFoundError';
import BadReqError from '../utils/errors/BadRequestError';
import mongoose from "../config/mongoose";

export const createUser = async (req, res, next) => {
  try {
    let {password} = req.body;
    req.body.password = await bcrypt.hash(password, await bcrypt.genSalt(8));
    const user = new UserSchema(req.body);
    const newUser = await user.save();
    const token = await jwt.sign({_id: newUser._id}, KEY_TOKEN, {expiresIn: expiresToken});
    //convert to js object to drop password field
    const newUserObj = newUser.toObject();
    delete newUserObj.password;
    delete newUserObj.messages;
    res.send({token, user: newUserObj});
  } catch (err) {
    next(new BadReqError());
  }
};

export const login = async (req, res, next) => {
  try {
    const {email, password} = req.body;
    const user = await UserSchema.findOne({email}, null, {lean: true});

    const isSamePasswords = await bcrypt.compare(password, user.password);
    if (!isSamePasswords) {
      return next(new BadReqError());
    }

    const newToken = await jwt.sign({_id: user._id}, KEY_TOKEN, {expiresIn: expiresToken});
    delete user.password;
    res.send({token: newToken, user});
  } catch (err) {
    next(new NotFoundError())
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    let db = await mongoose;
    const token = await jwt.sign({_id: req.currentUser._id}, KEY_TOKEN, {expiresIn: expiresToken});

    if (!token) {
      return next(new NotFoundError())
    }

    res.send({token: req.token,user});
  } catch (err) {
    next(err)
  }
};
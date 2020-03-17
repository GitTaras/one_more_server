import UserSchema from '../models/users';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { KEY_TOKEN, expiresToken } from '../utils/constants';
import NotFoundError from '../utils/errors/NotFoundError';
import BadReqError from '../utils/errors/BadRequestError';
import mongoose from "../config/mongoose";

export const createUser = async (req, res, next) => {
  try {
    let {password, email} = req.body;
    req.body.password = await bcrypt.hash(password, await bcrypt.genSalt(8));
    const user = new UserSchema(req.body);
    const newUser = await user.save();
    const token = await jwt.sign({_id: newUser.id}, KEY_TOKEN, {expiresIn: expiresToken});

    res.send({token, user: newUser.toObject()});
  } catch (err) {
    if (err.code === 11000 ) {
      return next(new BadReqError("Email already exists"));
    }
    next(new BadReqError());
  }
};

export const login = async (req, res, next) => {
  try {
    const {email, password} = req.body;
    const user = await UserSchema.findOne({email}, null);

    const isSamePasswords = await bcrypt.compare(password, user.password);
    if (!isSamePasswords) {
      return next(new BadReqError("wrong email or password"));
    }

    const newToken = await jwt.sign({_id: user.id}, KEY_TOKEN, {expiresIn: expiresToken});

    res.send({token: newToken, user: user.toObject()});
  } catch (err) {
    console.log(err);
    next(new BadReqError("User not found"))
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    let db = await mongoose;
    const token = await jwt.sign({_id: req.currentUser.id}, KEY_TOKEN, {expiresIn: expiresToken});

    if (!token) {
      return next(new NotFoundError())
    }

    const user = req.currentUser.toObject();

    res.send({token: req.token, user});
  } catch (err) {
    next(err)
  }
};
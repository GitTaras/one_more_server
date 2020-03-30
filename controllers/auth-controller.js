import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Users from '../models/User';
import { KEY_TOKEN, expiresToken } from '../utils/constants';
import NotFoundError from '../utils/errors/NotFoundError';
import BadReqError from '../utils/errors/BadRequestError';

export const createUser = async (req, res, next) => {
  try {
    const userData = req.body;
    userData.password = await bcrypt.hash(userData.password, await bcrypt.genSalt(8));
    const newUser = await Users.create(userData);
    const token = await jwt.sign({ _id: newUser.id }, KEY_TOKEN, { expiresIn: expiresToken });

    res.send({ token, user: newUser.toJSON() });
  } catch (err) {
    if (err.code === 11000) {
      return next(new BadReqError('Email already exists'));
    }
    next(new BadReqError());
  }
};

export const update = async (req, res, next) => {
  try {
    const result = await Users.findOneAndUpdate({ _id: req.currentUser.id }, req.body, {
      new: true,
    });
    if (!result) {
      return next(new BadReqError());
    }
    const token = await jwt.sign({ _id: req.currentUser.id }, KEY_TOKEN, {
      expiresIn: expiresToken,
    });
    res.send({ token, user: result.toJSON() });
  } catch (err) {
    if (err.code === 11000) {
      return next(new BadReqError('Email already exists'));
    }
    next(new BadReqError());
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email }, null);
    const isEqualsPasswords = await bcrypt.compare(password, user.password);

    if (!isEqualsPasswords) {
      return next(new BadReqError('wrong email or password'));
    }

    const newToken = await jwt.sign({ _id: user.id }, KEY_TOKEN, { expiresIn: expiresToken });

    res.send({ token: newToken, user: user.toJSON() });
  } catch (err) {
    next(new BadReqError('User not found'));
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    const token = await jwt.sign({ _id: req.currentUser.id }, KEY_TOKEN, {
      expiresIn: expiresToken,
    });

    if (!token) {
      return next(new NotFoundError());
    }

    const user = req.currentUser.toJSON();

    res.send({ token: req.token, user });
  } catch (err) {
    next(err);
  }
};

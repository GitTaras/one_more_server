import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Users from '../models/User';
import NotFoundError from '../utils/errors/NotFoundError';
import BadReqError from '../utils/errors/BadRequestError';

const { KEY_TOKEN, EXPIRES_TOKEN } = process.env;

export const store = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, await bcrypt.genSalt(8));
    const userData = { ...req.body, password: hashedPassword };
    const user = await Users.create(userData);
    const token = await jwt.sign({ _id: user.id }, KEY_TOKEN, { expiresIn: EXPIRES_TOKEN });

    res.json({ token, user });
  } catch (err) {
    if (err.code === 11000) {
      return next(new BadReqError('Email or Username already exists'));
    }
    next(new BadReqError());
  }
};

export const update = async (req, res, next) => {
  try {
    const user = await Users.findOneAndUpdate({ _id: req.user.id }, req.body, {
      new: true,
    });
    if (!user) {
      return next(new BadReqError());
    }
    const token = await jwt.sign({ _id: req.user.id }, KEY_TOKEN, {
      expiresIn: EXPIRES_TOKEN,
    });
    res.json({ token, user: user });
  } catch (err) {
    if (err.code === 11000) {
      return next(new BadReqError('Email already exists'));
    }
    next(new BadReqError());
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email }, null);
    const isEqualsPasswords = await bcrypt.compare(password, user.password);

    if (!isEqualsPasswords) {
      return next(new BadReqError('wrong email or password'));
    }

    const newToken = await jwt.sign({ _id: user.id }, KEY_TOKEN, { expiresIn: EXPIRES_TOKEN });

    res.json({ token: newToken, user });
  } catch (err) {
    next(new BadReqError('User not found'));
  }
};

export const show = async (req, res, next) => {
  try {
    const token = await jwt.sign({ _id: req.user.id }, KEY_TOKEN, {
      expiresIn: EXPIRES_TOKEN,
    });

    if (!token) {
      return next(new NotFoundError());
    }

    res.json({ token: req.token, user: req.user });
  } catch (err) {
    next(err);
  }
};

export const autocomplete = async (req, res, next) => {
  try {
    const { limit = 15 } = req.query.limit;
    const regexp = new RegExp(`^${req.query.name}`, 'ig');
    const users = await Users.find(
      { $or: [{ username: regexp }, { fullName: regexp }] },
      { username: 1, email: 1, id: 1, fullName: 1 },
      { limit: limit }
    );
    res.json(users);
  } catch (err) {
    next(new BadReqError());
  }
};

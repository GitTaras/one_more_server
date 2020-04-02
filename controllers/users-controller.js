import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Users from '../models/User';
import NotFoundError from '../utils/errors/NotFoundError';
import BadReqError from '../utils/errors/BadRequestError';

const { KEY_TOKEN, EXPIRES_TOKEN } = process.env;

export const store = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, await bcrypt.genSalt(8));
  const userData = { ...req.body, password: hashedPassword };
  const user = await Users.create(userData);
  const token = await jwt.sign({ _id: user.id }, KEY_TOKEN, { expiresIn: EXPIRES_TOKEN });
  res.json({ token, user });
};

export const update = async (req, res) => {
  const user = await Users.findOneAndUpdate({ _id: req.user.id }, req.body, {
    new: true,
  });
  if (!user) {
    throw new BadReqError();
  }
  const token = await jwt.sign({ _id: req.user.id }, KEY_TOKEN, {
    expiresIn: EXPIRES_TOKEN,
  });
  res.json({ token, user: user });
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email }, null);
  if (!user) throw new BadReqError('wrong email or password');

  const isEqualsPasswords = await bcrypt.compare(password, user.password);
  if (!isEqualsPasswords) throw BadReqError('wrong email or password');

  const newToken = await jwt.sign({ _id: user.id }, KEY_TOKEN, { expiresIn: EXPIRES_TOKEN });

  res.json({ token: newToken, user });
};

export const show = async (req, res) => {
  const token = await jwt.sign({ _id: req.user.id }, KEY_TOKEN, {
    expiresIn: EXPIRES_TOKEN,
  });

  if (!token) {
    throw new NotFoundError();
  }

  res.json({ token: req.token, user: req.user });
};

export const autocomplete = async (req, res) => {
  const { limit = 15 } = req.query.limit;
  const regexp = new RegExp(`^${req.query.name}`, 'ig');
  const users = await Users.find(
    { username: regexp },
    { username: 1, email: 1, id: 1 },
    { limit }
  );
  res.json(users);
};

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Users from '../models/User';
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
  if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(8));
  }
  // req.file {
  //   fieldname: 'avatar',
  //     originalname: 'Screenshot from 2020-02-20 13-41-10.png',
  //     encoding: '7bit',
  //     mimetype: 'image/png',
  //     destination: '/home/developer/Documents/test-task-server/uploads',
  //     filename: '1586716208466-2bb8.png',
  //     path: '/home/developer/Documents/test-task-server/uploads/1586716208466-2bb8.png',
  //     size: 309057
  // }

  req.file && (req.body.avatar = `/uploads/${req.file.filename}`);

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
  if (!isEqualsPasswords) throw new BadReqError('wrong email or password');

  const token = await jwt.sign({ _id: user.id }, KEY_TOKEN, { expiresIn: EXPIRES_TOKEN });

  res.json({ token, user });
};

export const show = async (req, res) => {
  const token = await jwt.sign({ _id: req.user.id }, KEY_TOKEN, {
    expiresIn: EXPIRES_TOKEN,
  });

  res.json({ token, user: req.user });
};

export const autocompleteUsername = async (req, res) => {
  const limit = 15;
  const pattern = new RegExp(`^${req.params.name}`, 'ig');
  const users = await Users.find({ username: pattern }, { username: 1, email: 1, id: 1 }, { limit });
  res.json(users);
};

import { postMessageSchema, deleteMessageSchema, signinSchema, signupSchema } from './validationShemes';
import BadReqError from './errors/BadRequestError';

module.exports.yupValidatorPostMessage = async (req, res, next) => {
  try {
    await postMessageSchema.validate(req.body);
    next();
  } catch (err) {
    next(new BadReqError(err.errors));
  }
};

module.exports.yupValidatorDeleteMessage = async (req, res, next) => {
  try {
    await deleteMessageSchema.validate(req.params);
    next();
  } catch (err) {
    next(new BadReqError(err.errors));
  }
};

module.exports.yupValidationSignUp = async (req, res, next) => {
  try {
    await signupSchema.validate(req.body);
    next();
  } catch (err) {
    next(new BadReqError(err.errors));
  }
};

module.exports.yupValidationSignIn = async (req, res, next) => {
  try {
    await signinSchema.validate(req.body);
    next();
  } catch (err) {
    next(new BadReqError(err.errors));
  }
};
import { postMessageSchema, deleteMessageSchema, signinSchema, signupSchema } from './validationShemes';
import BadReqError from './errors/BadRequestError';

const createValidator = (schema, obj) => async (req, res, next) => {
  try {
    await schema.validate(req[obj], { abortEarly: false });
    next();
  } catch (err) {
    let errObj = err.inner.reduce((acc, err) =>(
      {...acc, [err.path]: [...acc[err.path] || [],  ...err.errors]}
    ), {});
    next(new BadReqError(errObj));
  }
};

export const validatorPostMessage = createValidator(postMessageSchema, 'body');
export const validatorDeleteMessage = createValidator(deleteMessageSchema, 'params');
export const validatorSignUp = createValidator(signupSchema, 'body');
export const validatorSignIn = createValidator(signinSchema, 'body');
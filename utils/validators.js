import { postMessageSchema, deleteMessageSchema, signinSchema, signupSchema } from './validationShemes';
import BadReqError from './errors/BadRequestError';

function errToJSON(error, target = {}) {
  if (error.inner.length) {
    error.inner.forEach(inner => {
      errToJSON(inner, target, inner.path)
    });

    return target;
  }

  let path = error.path || '';
  let existing = target[path];

  let json = {
    message: error.message,
    values: error.params,
    type: error.type
  };

  target[path] = existing
    ? [...existing, json]
    : [json];

  return target;
}

const createValidator = (schema, obj) => async (req, res, next) => {
  try {
    await schema.validate(req[obj], { abortEarly: false });
    next();
  } catch (err) {
    console.log(err);
    console.log(errToJSON(err));
    next(new BadReqError(err.errors));
  }
};

export const yupValidatorPostMessage = createValidator(postMessageSchema, 'body');
export const yupValidatorDeleteMessage = createValidator(deleteMessageSchema, 'params');
export const yupValidatorSignUp = createValidator(signupSchema, 'body');
export const yupValidatorSignIn = createValidator(signinSchema, 'body');
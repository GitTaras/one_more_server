import BadReqError from './errors/BadRequestError';

export default (body, params) => async (req, res, next) => {
  try {
    if (body)
      await body.validate(req.body, { abortEarly: false });

    if (params)
      await params.validate(req.params, { abortEarly: false });

    next();
  } catch (err) {
    let errObj = err.inner.reduce((acc, err) =>(
      {...acc, [err.path]: [...acc[err.path] || [],  ...err.errors]}
    ), {});
    next(new BadReqError(errObj));
  }
};
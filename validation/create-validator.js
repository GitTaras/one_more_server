import BadReqError from '../utils/errors/BadRequestError';

export default (body, params, query) => async (req, res, next) => {
  try {
    if (body) await body.validate(req.body, { abortEarly: false });

    if (params) await params.validate(req.params, { abortEarly: false });

    if (query) await query.validate(req.query, { abortEarly: false });

    next();
  } catch (err) {
    const errObj = err.inner.reduce(
      (acc, err) => ({ ...acc, [err.path]: [...(acc[err.path] || []), ...err.errors] }),
      {}
    );
    next(new BadReqError(errObj));
  }
};

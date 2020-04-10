export const createValidator = (body, params, query) => async (req, res, next) => {
  if (body) await body.validate({ ...req.body, user: req.user }, { abortEarly: false });

  if (params) await params.validate(req.params, { abortEarly: false });

  if (query) await query.validate(req.query, { abortEarly: false });

  next();
};

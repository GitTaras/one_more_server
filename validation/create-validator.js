export default (body, params, query) => async (req, res, next) => {
  if (body) await body.validate(req.body, { abortEarly: false });

  if (params) await params.validate(req.params, { abortEarly: false });

  if (query) await query.validate(req.query, { abortEarly: false });

  next();
};

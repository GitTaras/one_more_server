import ApplicationError from './errors/ApplicationError';

export default (err, req, res, next) => {
  console.log(err);
  if (err instanceof ApplicationError) {
    res.status(err.status).json(err.message);
  } else if (err.name === 'ValidationError') {
    const error = err.inner.reduce(
      (acc, err) => ({ ...acc, [err.path]: [...(acc[err.path] || []), ...err.errors] }),
      {}
    );
    res.status(400).json({ message: err.message, error });
  } else if (err.name === 'TokenExpiredError') {
    res.status(401).json({ message: err.message });
  } else {
    res.status(500).json('Oops! Something went wrong');
  }
};

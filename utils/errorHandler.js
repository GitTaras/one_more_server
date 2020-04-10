import ApplicationError from './errors/ApplicationError';

export const errorHandler = (err, req, res, next) => {
  console.log(err);
  if (err instanceof ApplicationError) {
    res.status(err.status).json({ message: err.message });
  } else if (err.name === 'ValidationError') {
    const errors = err.inner.reduce(
      (acc, err) => ({ ...acc, [err.path]: [...(acc[err.path] || []), ...err.errors] }),
      {}
    );
    res.status(400).json({ message: err.message, errors });
  } else if (err.name === 'TokenExpiredError') {
    res.status(401).json({ message: err.message });
  } else {
    res.status(500).json('Oops! Something went wrong');
  }
};

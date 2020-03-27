import ApplicationError from './ApplicationError';

class BadReqError extends ApplicationError {
  constructor(message) {
    super(message || 'Check your data and try again!', 400);
  }
}

module.exports = BadReqError;

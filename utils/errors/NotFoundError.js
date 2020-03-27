import ApplicationError from './ApplicationError';

class NotFoundError extends ApplicationError {
  constructor(message) {
    super(message || 'Opps, nothing found!', 404);
  }
}

module.exports = NotFoundError;

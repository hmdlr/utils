export class UnauthorizedError extends Error {
  constructor(message, public status = 401) {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

export class CacaError extends Error {
  constructor(message, public status = 401) {
    super(message);
    this.name = 'CacaError';
  }
}

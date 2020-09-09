class DefaultError extends Error {
  constructor(message, statusCode) {
    super();
    if (arguments.length === 2)
        this.statusCode = statusCode;
    this.message = message;
  }

  getCode() {
    if (this.statusCode)
        return this.statusCode;
    if (this instanceof BadRequest) {
      return STATUS_CODE.BAD_REQUEST;
    }
    return STATUS_CODE.INTERNAL_SERVER_ERROR;
  }
}

class BadRequest extends DefaultError {}

const STATUS_CODE = {
    'SUCCESS':200,
    'UNAUTHORIZED':401,
    'BAD_REQUEST':400,
    'METHOD_NOT_ALLOW':405,
    'INTERNAL_SERVER_ERROR':500,
}
module.exports = {
  DefaultError,
  BadRequest,
  STATUS_CODE
};

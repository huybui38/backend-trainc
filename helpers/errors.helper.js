class DefaultError extends Error {
    constructor(message, statusCode) {
        super();
        if (arguments.length === 2) this.statusCode = statusCode;
        this.message = message;
    }

    getCode() {
        if (this.statusCode) return this.statusCode;
        if (this instanceof BadRequest) return STATUS_CODE.BAD_REQUEST;

        if (this instanceof Unauthorized) return STATUS_CODE.UNAUTHORIZED;

        if (this instanceof Forbidden) return STATUS_CODE.FORBIDDEN;

        return STATUS_CODE.INTERNAL_SERVER_ERROR;
    }
}

class BadRequest extends DefaultError {}
class Unauthorized extends DefaultError {}
class Forbidden extends DefaultError {}

const STATUS_CODE = {
    SUCCESS: 200,
    UNAUTHORIZED: 401,
    BAD_REQUEST: 400,
    METHOD_NOT_ALLOW: 405,
    INTERNAL_SERVER_ERROR: 500,
    FORBIDDEN: 403,
};
module.exports = {
    DefaultError,
    BadRequest,
    Unauthorized,
    Forbidden,
    STATUS_CODE,
};

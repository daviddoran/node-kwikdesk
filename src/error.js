function KwikdeskError(message, code) {
    Error.call(this, message);
    this.message = message;
    this.code = code;
}

KwikdeskError.prototype = Object.create(Error.prototype);
KwikdeskError.prototype.constructor = KwikdeskError;

KwikdeskError.RateLimitExceeded = 6;
KwikdeskError.DuplicateContent = 9;
KwikdeskError.MissingParameter = 3;
KwikdeskError.BadContentType = 12;
KwikdeskError.InternalError = 666;

module.exports = KwikdeskError;

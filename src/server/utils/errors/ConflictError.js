export class ConflictError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ConflictError';
        this.statusCode = 409;
    }
}

export class NotFoundError extends Error {
    constructor(message) {
        let defaultMessage = message || "Not Found";
        super(defaultMessage);
        this.name = 'NotFoundError';
        this.statusCode = 404;
    }
}

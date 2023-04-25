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

export class TokenValidationError extends Error {
    constructor(message) {
        let defaultMessage = message || "토큰 검증 실패, 토큰 만료 또는 잘못된 토큰입니다.";
        super(defaultMessage);
        this.name = 'TokenValidationError';
        this.statusCode = 401;
    }
}
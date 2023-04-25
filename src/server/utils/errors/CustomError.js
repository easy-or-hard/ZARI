export class CustomError extends Error {
    statusCode = 500;
    name = 'CustomError';
    constructor(message) {
        super(message);
    }
}

export class NotFoundError extends CustomError {
    constructor(message) {
        let defaultMessage = message || "Not Found";
        super(defaultMessage);
        this.name = 'NotFoundError';
        this.statusCode = 404;
    }
}

export class TokenValidationError extends CustomError {
    constructor(message) {
        let defaultMessage = message || "토큰 검증 실패, 토큰 만료 또는 잘못된 토큰입니다.";
        super(defaultMessage);
        this.name = 'TokenValidationError';
        this.statusCode = 401;
    }
}
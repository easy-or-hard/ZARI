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

export class NameAlreadyExistsError extends CustomError {
    constructor(message) {
        let defaultMessage = message || "이미 존재하는 이름입니다.";
        super(defaultMessage);
        this.name = 'NameAlreadyExistsError';
        this.statusCode = 409;
    }
}

export class NameRequiredError extends CustomError {
    constructor(message) {
        let defaultMessage = message || "이름은 필수입니다.";
        super(defaultMessage);
        this.name = 'NameRequiredError';
        this.statusCode = 400;
    }
}

export class CanNotChangeZodiacError extends CustomError {
    constructor(message) {
        let defaultMessage = message || "별자리는 변경할 수 없습니다.";
        super(defaultMessage);
        this.name = 'canNotChangeZodiacError';
        this.statusCode = 400;
    }
}

export class NotVaildatedAccessError extends CustomError {
    constructor(message) {
        let defaultMessage = message || "인증되지 않은 접근 입니다.";
        super(defaultMessage);
        this.name = 'NotVaildatedAccessError';
        this.statusCode = 401;
    }
}
export class CustomError extends Error {
    statusCode = 500;
    name = 'CustomError';
    constructor(message) {
        super(message);
    }
}

/**
 * @swagger
 * components:
 *   responses:
 *     InternalServerError:
 *       description: 서버에서 예상하지 못한 오류가 발생했습니다.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: 서버에서 예상하지 못한 오류가 발생했습니다.
 */
export class InternalServerError extends CustomError {
    constructor(message) {
        let defaultMessage = message || "서버에서 예상하지 못한 오류가 발생했습니다.";
        super(defaultMessage);
        this.name = 'InternalServerError';
        this.statusCode = 500;
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

/**
 * 인스턴스가 이미 있으면 에러 발생
 */
export class ExistsInstanceError extends CustomError {
    constructor(message) {
        let defaultMessage = message || "이미 존재하는 인스턴스 입니다.";
        super(defaultMessage);
        this.name = 'canNotChangeZodiacError';
        this.statusCode = 409;
    }
}

/**
 * @swagger
 * components:
 *   responses:
 *     UnauthorizedError:
 *       description: 인증되지 않은 접근
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: 인증되지 않은 접근입니다.
 */
export class UnauthorizedError extends CustomError {
    constructor(message) {
        let defaultMessage = message || "인증되지 않은 접근 입니다.";
        super(defaultMessage);
        this.name = 'UnauthorizedError';
        this.statusCode = 401;
    }
}

export class EmptyIdError extends CustomError {
    constructor(message) {
        let defaultMessage = message || "ID가 비었습니다.";
        super(defaultMessage);
        this.name = 'EmptyIdError';
        this.statusCode = 400;
    }
}

export class ExistsIdError extends CustomError {
    constructor(message) {
        let defaultMessage = message || "이미 존재하는 ID입니다.";
        super(defaultMessage);
        this.name = 'ExistsIdError';
        this.statusCode = 409;
    }
}

export class NotExistsIdError extends CustomError {
    constructor(message) {
        let defaultMessage = message || "존재하지 않는 ID입니다.";
        super(defaultMessage);
        this.name = 'NotExistsIdError';
        this.statusCode = 404;
    }
}


/**
 * @swagger
 * components:
 *   responses:
 *     EmptyNameError:
 *       description: 이름이 비었습니다.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: 이름이 비었습니다.
 */
export class EmptyNameError extends CustomError {
    constructor(message) {
        let defaultMessage = message || "이름이 비었습니다.";
        super(defaultMessage);
        this.name = 'EmptyNameError';
        this.statusCode = 400;
    }
}

/**
 * @swagger
 * components:
 *   responses:
 *     NameAlreadyExistsError:
 *       description: 존재하는 이름을 재사용하려면 오류 발생
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: 이미 존재하는 이름입니다.
 */
export class ExistsNameError extends CustomError {
    constructor(message) {
        let defaultMessage = message || "이미 존재하는 이름입니다.";
        super(defaultMessage);
        this.name = 'ExistsNameError';
        this.statusCode = 409;
    }
}

export class NotExistsNameError extends CustomError {
    constructor(message) {
        let defaultMessage = message || "존재하지 않는 이름입니다.";
        super(defaultMessage);
        this.name = 'NotExistsNameError';
        this.statusCode = 404;
    }
}

export class EmptyUserError extends CustomError {
    constructor(message) {
        let defaultMessage = message || "사용자가 비었습니다. (로그인이 필요합니다.)";
        super(defaultMessage);
        this.name = 'EmptyUserError';
        this.statusCode = 400;
    }
}
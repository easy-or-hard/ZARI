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
export class NameAlreadyExistsError extends CustomError {
    constructor(message) {
        let defaultMessage = message || "이미 존재하는 이름입니다.";
        super(defaultMessage);
        this.name = 'NameAlreadyExistsError';
        this.statusCode = 409;
    }
}

/**
 * @swagger
 * components:
 *   responses:
 *     NameRequiredError:
 *       description: 이름은 필수 입니다.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: 이름이 비었습니다. 이름은 필수 입니다.
 */
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
        let defaultMessage = message || "한 번 선택한 별자리는 변경할 수 없습니다.";
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

/**
 * @swagger
 * components:
 *   responses:
 *     ByeolIdAlreadyExistsError:
 *       description: 존재하는 ID를 재사용하려면 오류 발생
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: 이미 존재하는 ID입니다.
 */
export class ByeolIdAlreadyExistsError extends CustomError {
    constructor(message) {
        let defaultMessage = message || "이미 존재하는 ID입니다.";
        super(defaultMessage);
        this.name = 'ByeolIdAlreadyExistsError';
        this.statusCode = 409;
    }
}

/**
 * @swagger
 * components:
 *   responses:
 *     IdRequiredError:
 *       description: ID를 입력하지 않았을 때 발생하는 오류
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: ID는 필수 값 입니다.
 */
export class IdRequiredError extends CustomError {
    constructor(message) {
        let defaultMessage = message || "ID는 필수 입니다.";
        super(defaultMessage);
        this.name = 'IdRequiredError';
        this.statusCode = 400;
    }
}
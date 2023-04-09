import morgan from 'morgan';

/**
 * @description
 * 모르간을 커스텀하기 위한 클래스
 * 모르간은 클래스 기반이 아니기 때문에 상속 받아서 구현하지 않습니다.
 * 또, 모르간의 사용법은 morgan() 이기 때문에, 똑같이 사용할 수 있도록,
 * 클래스를 함수처럼 사용할 수 있도록 생성자에서 리턴을 구현합니다.
 */
export default new class CustomMorgan {
    static #instance;

    constructor() {
        if (this.constructor.#instance) {
            return this.constructor.#instance;
        }

        this.constructor.#instance = () => morgan(this.#format, this.#options);
        return this.constructor.#instance;
    }


    #format = ':method :url :status :res[content-length] - :response-time ms';
    #options = {
        stream: {
            write: (message) => {
                console.log(message);
            }
        }
    }
}
import Sequelize from 'sequelize';
import CustomProcess from "./CustomProcess.js";
import {InitializeModels} from "../../MVC/models/InitializeModels.js";

export default class CustomSequelize extends Sequelize {
    static #instance;
    static #process;

    constructor({
                    _customProcess = new CustomProcess()
                } = {}) {
        if (CustomSequelize.#instance) {
            return CustomSequelize.#instance;
        }

        // 부모 클래스의 생성자를 호출할 때 필요한 인자가 주입으로 받기 때문에
        // 정적 변수에 담아야 부모 클래스가 호출 할 수 있다.
        // TODO: 정적 변수에 담지 않고 부모 클래스의 생성자를 호출하는 방법은 없을까?
        CustomSequelize.#process = _customProcess;

        super(CustomSequelize.#options);
        this.constructor.#instance = this;

        InitializeModels.initialize(this);
    }

    static get #options() {
        return {
            ...CustomSequelize.#process.env.SEQUELIZE_OPTIONS,
            define: {
                // timestamps: true,
                freezeTableName: true, // 테이블 이름을 모델 이름과 동일하게 설정, false는 테이블이름을 복수형으로 설정
                autoIncrement: true, // 자동 컬럼 id 부여 옵션
                underscored: true, // underscored 옵션은 모델의 속성 중에서 데이터베이스에 저장될 컬럼명을 snake_case로 생성합니다.
                underscoredAll: true // underscoredAll 옵션은 모델의 모든 속성, 즉 데이터베이스에 저장되는 컬럼명과 함께 자동 생성되는 테이블명도 snake_case로 생성합니다.
            }
        }
    }
}

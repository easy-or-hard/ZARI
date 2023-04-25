import Sequelize from 'sequelize';
import CustomProcess from "./CustomProcess.js";
import {InitializeModels} from "../../MVC/models/InitializeModels.js";

export default class CustomSequelize extends Sequelize {
    static #instance;

    constructor(customProcess = new CustomProcess()) {
        if (CustomSequelize.#instance) {
            return CustomSequelize.#instance;
        }

        super(customProcess.env.SEQUELIZE_OPTIONS);
        this.constructor.#instance = this;

        this.options.define = CustomSequelize.#options;
        InitializeModels.initialize(this.constructor.#instance);
    }

    static get #options() {
        return {
            // timestamps: true,
            // freezeTableName: true, // 테이블 이름을 모델 이름과 동일하게 설정, false는 테이블이름을 복수형으로 설정
            autoIncrement: true, // 자동 컬럼 id 부여 옵션
            // underscored: true, // underscored 옵션은 모델의 속성 중에서 데이터베이스에 저장될 컬럼명을 snake_case로 생성합니다.
            // underscoredAll: true // underscoredAll 옵션은 모델의 모든 속성, 즉 데이터베이스에 저장되는 컬럼명과 함께 자동 생성되는 테이블명도 snake_case로 생성합니다.
        }
    }
}

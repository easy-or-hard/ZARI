import ByeolModel from "./ByeolModel.js";
import ZariModel from "./ZariModel.js";
import BanzzackModel from "./BanzzackModel.js";

export class InitializeModels {

    static initialize(sequelize) {
        this.#initialize(sequelize);
        this.#associate();
    }

    static #initialize(sequelize) {
        ByeolModel.initialize(sequelize);
        ZariModel.initialize(sequelize);
        BanzzackModel.initialize(sequelize);
    }

    static #associate() {
        ByeolModel.associate();
        ZariModel.associate();
        BanzzackModel.associate();
    }
}
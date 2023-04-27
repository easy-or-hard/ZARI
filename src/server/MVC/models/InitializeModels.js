import Byeol from "./Byeol.js";
import Zari from "./Zari.js";
import Banzzack from "./Banzzack.js";

export class InitializeModels {

    static initialize(sequelize) {
        this.#initialize(sequelize);
        this.#associate();
    }

    static #initialize(sequelize) {
        Byeol.initialize(sequelize);
        Zari.initialize(sequelize);
        Banzzack.initialize(sequelize);
    }

    static #associate() {
        Byeol.associate();
        Zari.associate();
        Banzzack.associate();
    }
}
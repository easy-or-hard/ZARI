import Byeol from "./Byeol.js";
import Zari from "./Zari.js";
import Banzzack from "./Banzzack.js";
import Zodiac from "./Zodiac.js";

export class InitializeModels {

    static initialize(sequelize) {
        this.#initialize(sequelize);
        this.#associate();
    }

    static #initialize(sequelize) {
        Byeol.initialize(sequelize);
        Zari.initialize(sequelize);
        Banzzack.initialize(sequelize);
        Zodiac.initialize(sequelize);
    }

    static #associate() {
        Byeol.associate();
        Zari.associate();
        Banzzack.associate();
        Zodiac.associate();
    }
}
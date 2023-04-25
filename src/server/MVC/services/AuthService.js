import ByeolModel from "../models/ByeolModel.js";
import {CustomError} from "../../utils/errors/CustomError.js";

export default class AuthService {
    static #instance;
    constructor() {
        if (this.constructor.#instance) {
            return this.constructor.#instance;
        }
        this.constructor.#instance = this;
    }


    /**
     * @param byeol
     * @returns {Promise<ByeolModel>}
     */
    async signUp(byeol) {
        const [instance, created] = await ByeolModel.findOrCreate({
            where: { byeol }
        });

        if (!created) {
            throw new CustomError("Byeol already exists");
        }

        return instance;
    }
}
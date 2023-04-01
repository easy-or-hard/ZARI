import ZodiacUniverseModel from "../models/ZodiacUniverseModel.js";

export default new class ZodiacService {
    static #instance;

    constructor() {
        if (this.constructor.#instance) {
            return this.constructor.#instance;
        }
        this.constructor.#instance = this;
    }

    async create(req) {
        const hasZodiacUniverse = await ZodiacUniverseModel.findByPk(req.body.name);

        let status;
        let result;
        if (hasZodiacUniverse) {
            status = 409;
            result = "Zodiac Universe already exists";
        } else {
            status = 201;
            result = await ZodiacUniverseModel.create(req.body);
        }

        return {status, result};
    }

    async findByPk(name) {
        let result = await ZodiacUniverseModel.findByPk(name);
        const status = result ? 200 : 404;
        result = result ? result : "Zodiac Universe not found";
        return {status, result};
    }

    async findAll() {
        const result = await ZodiacUniverseModel.findAll();
        const status = 200;
        return {status, result};
    }
}
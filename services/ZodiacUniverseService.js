import ZodiacUniverseModel from "../models/ZodiacUniverseModel.js";
import {ConflictError, NotFoundError} from "./errors/ConflictError.js";

export default new class ZodiacUniverseService {
    static #instance;

    constructor() {
        if (this.constructor.#instance) {
            return this.constructor.#instance;
        }
        this.constructor.#instance = this;
    }

    /**
     *
     * @param data
     * @returns {Promise<ZodiacUniverseModel>}
     * @throws ConflictError
     */
    async create(data) {
        const condition = {where: {name: data.name}, group: ['name']};
        const count = await ZodiacUniverseModel.count(condition);
        const hasZodiacUniverse = count > 0;
        if (hasZodiacUniverse) {
            throw new ConflictError("Zodiac Universe already exists");
        }
        return await ZodiacUniverseModel.create(data);
    }

    /**
     *
     * @param {string} name
     * @returns {Promise<ZodiacUniverseModel>}
     */
    async findByPk(name) {
        const result = await ZodiacUniverseModel.findByPk(name);
        if (!result) {
            throw new NotFoundError("Zodiac Universe not found");
        }
        return result;
    }

    /**
     *
     * @param {number} page
     * @param {number} pageSize
     * @param {string} sortBy
     * @param {'ASC' | 'DESC'} sortOrder
     * @returns {Promise<ZodiacUniverseModel[]>}
     */
    async findAll(page = 1, pageSize = 10, sortBy = 'updatedAt', sortOrder = 'DESC') {
        const offset = (page - 1) * pageSize;
        const limit = pageSize;
        const order = [[sortBy, sortOrder]];
        const options = { offset, limit, order };
        return await ZodiacUniverseModel.findAll(options);
    }
}
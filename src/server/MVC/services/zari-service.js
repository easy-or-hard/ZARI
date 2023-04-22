import Zari from "../models/Zari.js";
import {ConflictError, NotFoundError} from "../../utils/errors/ConflictError.js";
import Banzzack from "../models/Banzzack.js";

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
     * @returns {Promise<Zari>}
     * @throws ConflictError
     */
    async create(data) {
        const condition = {where: {name: data.name}, group: ['name']};
        const count = await Zari.count(condition);
        const hasZodiacUniverse = count > 0;
        if (hasZodiacUniverse) {
            throw new ConflictError("Zodiac Universe already exists");
        }
        return await Zari.create(data);
    }

    /**
     *
     * @param {string} identifier
     * @returns {Promise<ZodiacModel>}
     */
    async findByPk(identifier) {
        const options = {
            include: {
                model: Banzzack
            }
        }
        const result = await Zari.findByPk(identifier, options);
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
     * @returns {Promise<ZodiacModel[]>}
     */
    async findAll(page = 1, pageSize = 10, sortBy = 'updatedAt', sortOrder = 'DESC') {
        const options = {
            offset: (page - 1) * pageSize,
            limit: pageSize,
            order: [[sortBy, sortOrder]],
            attributes: { exclude: ['createdAt', 'updateAt'] },
        };
        return await Zari.findAll(options);
    }

    async findAllIncludeComment(page = 1, pageSize = 10, sortBy = 'updatedAt', sortOrder = 'DESC') {
        const options = {
            offset: (page - 1) * pageSize,
            limit: pageSize,
            order: [[sortBy, sortOrder]],
            attributes: { exclude: ['createdAt', 'updateAt'] },
            include: {
                model: Banzzack,
                attributes: { exclude: ['createdAt', 'updateAt'] },
                through: { attributes: [] },
            },
        };
        return await Zari.findAll(options);
    }
}
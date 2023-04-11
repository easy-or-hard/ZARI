import zodiacModel from "../models/zodiac-model.js";
import {ConflictError, NotFoundError} from "./errors/ConflictError.js";
import CommentModel from "../models/comment-model.js";

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
     * @returns {Promise<ZodiacModel>}
     * @throws ConflictError
     */
    async create(data) {
        const condition = {where: {name: data.name}, group: ['name']};
        const count = await zodiacModel.count(condition);
        const hasZodiacUniverse = count > 0;
        if (hasZodiacUniverse) {
            throw new ConflictError("Zodiac Universe already exists");
        }
        return await zodiacModel.create(data);
    }

    /**
     *
     * @param {string} name
     * @returns {Promise<ZodiacModel>}
     */
    async findByPk(name) {
        const result = await zodiacModel.findByPk(name);
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
        return await zodiacModel.findAll(options);
    }

    async findAllIncludeComment(page = 1, pageSize = 10, sortBy = 'updatedAt', sortOrder = 'DESC') {
        const options = {
            offset: (page - 1) * pageSize,
            limit: pageSize,
            order: [[sortBy, sortOrder]],
            attributes: { exclude: ['createdAt', 'updateAt'] },
            include: {
                model: CommentModel,
                attributes: { exclude: ['createdAt', 'updateAt'] },
                through: { attributes: [] },
            },
        };
        return await zodiacModel.findAll(options);
    }
}
import ZariModel from "../models/ZariModel.js";
import {ConflictError, NotFoundError} from "../../utils/errors/ConflictError.js";
import BanzzackModel from "../models/BanzzackModel.js";

export default class ZariService {
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
     * @returns {Promise<ZariModel>}
     * @throws ConflictError
     */
    async create(data) {
        const condition = {where: {byeol: data.byeol}, group: ['byeol']};
        const count = await ZariModel.count(condition);
        const hasInstance = count > 0;
        if (hasInstance) {
            throw new ConflictError("Zodiac Universe already exists");
        }
        return await ZariModel.create(data);
    }

    /**
     *
     * @param identifier
     * @returns {Promise<ZariModel>}
     */
    async findByPk(identifier) {
        const options = {
            include: {
                model: BanzzackModel
            }
        }
        const result = await ZariModel.findByPk(identifier, options);
        if (!result) {
            throw new NotFoundError();
        }
        return result;
    }

    /**
     *
     * @param {number} page
     * @param {number} pageSize
     * @param {string} sortBy
     * @param {'ASC' | 'DESC'} sortOrder
     * @returns {Promise<ZariModel[]>}
     */
    async findAll(page = 1, pageSize = 10, sortBy = 'updatedAt', sortOrder = 'DESC') {
        const options = {
            offset: (page - 1) * pageSize,
            limit: pageSize,
            order: [[sortBy, sortOrder]],
            attributes: { exclude: ['createdAt', 'updateAt'] },
        };
        return await ZariModel.findAll(options);
    }

    async findAllIncludeComment(page = 1, pageSize = 10, sortBy = 'updatedAt', sortOrder = 'DESC') {
        const options = {
            offset: (page - 1) * pageSize,
            limit: pageSize,
            order: [[sortBy, sortOrder]],
            attributes: { exclude: ['createdAt', 'updateAt'] },
            include: {
                model: BanzzackModel,
                attributes: { exclude: ['createdAt', 'updateAt'] },
                through: { attributes: [] },
            },
        };
        return await ZariModel.findAll(options);
    }
}
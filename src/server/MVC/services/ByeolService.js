import Byeol from "../models/Byeol.js";
import CustomLogger from "../../utils/configure/CustomLogger.js";
import Banzzack from "../models/Banzzack.js";
import Temp from "../../utils/naming/Temp.js";
import {CanNotChangeZodiacError, NameAlreadyExistsError, NameRequiredError} from "../../utils/errors/CustomError.js";
import Zodiac from "../models/Zodiac.js";
import ZodiacService from "./ZodiacService.js";

export default class ByeolService {
    /**
     * @type {ByeolService}
     */
    static #instance;

    /**
     * @type {CustomLogger}
     */
    #logger;

    /**
     * @type {Byeol}
     */
    #byeolModel;

    /**
     * @type {ZodiacService}
     */
    #zodiacService;

    constructor({
                    _logger = new CustomLogger(),
                    _byeolModel = Byeol,
                    _zodiacService = new ZodiacService(),
                } = {}) {
        if (this.constructor.#instance) {
            return this.constructor.#instance;
        }
        this.constructor.#instance = this;

        this.#logger = _logger;
        this.#byeolModel = _byeolModel;
        this.#zodiacService = _zodiacService;
    }

    /**
     *
     * @param {Byeol} byeol
     * @returns {Promise<Model<any, TModelAttributes>>}
     */
    create = async (byeol) => {
        // providerId, provider, displayName 은 passport가 Oauth 통신후 나오는 값 입니다.
        // byeol 컨트롤러에서 이 메소드를 실행할 경우에는 displayName은 없습니다.
        const {name, providerId, provider, zodiac} = byeol;
        let isCanUseName = true;
        let tempName = name;

        while (isCanUseName) {
            isCanUseName = await this.isCanUseName(tempName);
            if (isCanUseName) {
                break;
            }
            tempName = Temp.generateRandomKoreanName();
        }

        return await this.#byeolModel.create({name: tempName, providerId, provider, zodiacId: zodiac?.id});
    }

    isCanUseName = async (name) => {
        if (!name) {
            throw new NameRequiredError();
        }
        const count = await this.#byeolModel.count({where: {name}});
        return count !== 0;
    }

    /**
     *
     * @param id
     * @returns {Promise<Byeol>}
     */
    read = async ({id}) => {
        this.#logger.info(`ByeolService.read: id: ${id}`);
        const options = {
            include: [
                {
                    model: Banzzack,
                    as: 'banzzackList'
                },
                {
                    model: Zodiac,
                    as: 'zodiac'
                }
            ]
        };
        return await this.#byeolModel.findByPk(id, options);
    }

    /**
     * @returns {Promise<Byeol[]>}
     */
    readAll = async (page = 1, pageSize = 10) => {
        const offset = (page - 1) * pageSize;
        const limit = pageSize;

        this.#logger.info(`ByeolService.readAll: offset: ${offset}, limit: ${limit}`);
        return await this.#byeolModel.findAll({
            offset,
            limit,
        });
    }

    /**
     * 별의 이름을 바꿉니다.
     * @param user - 사용자 객체
     * @param {string} name - 바꿀 이름
     * @returns {Promise<*>}
     */
    updateName = async (user, name) => {
        this.#logger.info(`ByeolService.update: user: ${user}, name: ${name}`);
        const isCanUseName = await this.isCanUseName(name);
        if (isCanUseName) {
            throw new NameAlreadyExistsError();
        }

        const instance = await this.#byeolModel.findByPk(user.id);
        return await instance.update({name});
    }

    /**
     * 별자리를 선택합니다. 다시 바꿀 수 없습니다.
     * @param user - 사용자 객체
     * @param {number} zodiacId - 바꿀 별자리 id
     * @returns {Promise<*>}
     */
    setZodiac = async (user, zodiacId) => {
        this.#logger.info(`ByeolService.update: user: ${user}, zodiacId: ${zodiacId}`);
        await this.#zodiacService.validateZodiacId(zodiacId);
        const instance = await this.#byeolModel.findByPk(user.id);
        await this.validateCanChangeZodiac(instance);
        return await instance.update({zodiacId});
    }

    /**
     * 별자리를 선택할 수 있는지 검사합니다.
     * @param instance
     * @returns {Promise<void>}
     */
    validateCanChangeZodiac = async (instance) => {
        if (instance.zodiacId) {
            throw new CanNotChangeZodiacError();
        }
    }

    delete = async user => {
        this.#logger.info(`ByeolService.delete: user: ${user}`);
        const condition = {
            where: {
                id: user.id
            }
        }
        return await this.#byeolModel.destroy(condition);
    }

    /**
     *
     * @param {number} id
     * @returns {Promise<*>}
     */
    findByPk = async (id) => {
        this.#logger.info(`ByeolService.findByPk: id: ${id}`);
        return await this.#byeolModel.findByPk(id, {
            include: [{
                model: Zari
            }]
        });
    }

    updateByeol = async (byeolId, byeol) => {
        this.#logger.info(`ByeolService.updateByeol: byeolId: ${byeolId}, byeol: ${byeol}`);
        const byeolInstance = await Byeol.findByPk(byeolId);
        return await byeolInstance.update({byeol});
    }

    userExists = async (providerId, provider) => {
        this.#logger.info(`ByeolService.userExists: providerId: ${providerId}, provider: ${provider}`);
        const condition = {
            where: {
                providerId,
                provider
            }
        }
        const byeol = await this.#byeolModel.findOne(condition);
        return !!byeol;
    }
}
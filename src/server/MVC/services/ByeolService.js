import Byeol from "../models/Byeol.js";
import CustomLogger from "../../lib/configure/CustomLogger.js";
import Banzzack from "../models/Banzzack.js";
import Temp from "../../lib/naming/Temp.js";
import {
    ByeolIdAlreadyExistsError,
    CanNotChangeZodiacError, IdRequiredError,
    NameAlreadyExistsError,
    NameRequiredError
} from "../../lib/errors/CustomError.js";
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
        let makeName = true;
        let tempName = name;

        while (makeName) {
            try {
                await this.validateName(tempName);
                makeName = false;
            } catch (e) {
                tempName = Temp.generateRandomKoreanName();
            }
        }

        return await this.#byeolModel.create({name: tempName, providerId, provider, zodiacId: zodiac?.id});
    }

    /**
     * 별의 아이디로 별을 찾습니다.
     * @param id - 별의 아이디
     * @returns {Promise<Model<any, TModelAttributes>>}
     */
    read = async id => {
        this.#logger.info(`ByeolService.read: id: ${id}`);
        await this.validateId(id);

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
     * 별의 이름으로 별을 찾습니다.
     * @param name
     * @returns {Promise<Byeol>}
     */
    readByName = async (name) => {
        this.#logger.info(`ByeolService.readByByeolName: name: ${name}`);
        await this.validateName(name);
        return await this.#byeolModel.findOne({where: {name}});
    }

    /**
     * 모든 별을 출력합니다. (페이징)
     * @param page
     * @param pageSize
     * @returns {Promise<Array<Byeol>>}
     */
    readAll = async (page = 1, pageSize = 10) => {
        this.#logger.info(`ByeolService.readAll: page: ${page}, pageSize: ${pageSize}`);

        const offset = (page - 1) * pageSize;
        const limit = pageSize;
        this.#logger.info(`ByeolService.readAll: offset: ${offset}, limit: ${limit}`);
        return await this.#byeolModel.findAll({offset, limit});
    }

    /**
     * 별의 이름을 바꿉니다.
     * @param user - 사용자 객체
     * @param {string} name - 바꿀 이름
     * @returns {Promise<*>}
     */
    updateName = async (user, name) => {
        this.#logger.info(`ByeolService.update: user: ${user}, name: ${name}`);
        await this.validateId(user.id);
        await this.validateName(name);

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
     * 별을 삭제합니다.
     * @param user
     * @returns {Promise<void>}
     */
    delete = async user => {
        this.#logger.info(`ByeolService.delete: user: ${user}`);
        const condition = {
            where: {
                id: user.id
            }
        }
        return await this.#byeolModel.destroy(condition);
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

    /**
     * 별의 아이디가 존재한다면 에러를 발생시킵니다.
     * @param id
     * @returns {Promise<void>}
     */
    validateId = async (id) => {
        this.#logger.info(`ByeolService.validateByeolId: byeolId: ${id}`);
        if (!id) {
            throw new IdRequiredError();
        }

        const byeol = await this.#byeolModel.findByPk(id);
        if (byeol) {
            throw new ByeolIdAlreadyExistsError();
        }
    }

    /**
     * 별의 이름을 검사하고 에러를 발생시킵니다.
     * @param name
     * @returns {Promise<void>}
     */
    validateName = async (name) => {
        this.#logger.info(`ByeolService.validateByeolName: name: ${name}`);

        if (!name) {
            throw new NameRequiredError();
        }

        const byeol = await this.#byeolModel.findOne({where: {name}});
        if (byeol) {
            throw new NameAlreadyExistsError();
        }
    }

    /**
     * 이미 별자리를 선택한 별은 다시 선택할 수 없습니다.
     * 선택된 별자리가 있다면 에러를 발생시킵니다.
     * @param instance
     * @returns {Promise<void>}
     */
    validateCanChangeZodiac = async (instance) => {
        if (instance.zodiacId) {
            throw new CanNotChangeZodiacError();
        }
    }
}
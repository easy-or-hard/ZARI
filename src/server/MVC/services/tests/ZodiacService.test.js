import {expect, assert} from 'chai';
import CustomSequelize from "../../../utils/configure/CustomSequelize.js";
import ZodiacService from "../ZodiacService.js";
describe('ByeolModel', () => {
    const sequelize = new CustomSequelize();
    const zodiacService = new ZodiacService();
    let byeolId;

    before(async () => {
        await sequelize.sync();
    });

    after(async () => {
        await sequelize.close();
    });

    it('별자리 조회', async () => {
        const instances = await zodiacService.readAll();
        expect(instances).to.be.ok;
    });

});
import {expect, assert} from 'chai';
import CustomSequelize from "../../../utils/configure/CustomSequelize.js";
import ZodiacService from "../ZodiacService.js";
import Zodiac from "../../models/Zodiac.js";
import DummyData from "../../../../dummy/DummyData.js";
import CustomProcess from "../../../utils/configure/CustomProcess.js";
describe('ByeolModel', () => {
    const process = new CustomProcess('test')
    const sequelize = new CustomSequelize(process);
    const zodiacService = new ZodiacService();
    let zodiacList;

    before(async () => {
        await sequelize.sync();
        zodiacList = await Zodiac.bulkCreate(DummyData.dummyZodiacList);
    });

    after(async () => {
        await sequelize.close();
    });

    it('황도궁 목록 조회', async () => {
        const instances = await zodiacService.readAll();
        expect(instances).to.be.ok;
    });

    it('단일 황도궁 조회', async () => {
        let temp; // 테스트 사용시 임시로 넣을 값, 없으면 1
        const zodiacId = temp || 1;
        const instance = await zodiacService.readOne(zodiacId);
        expect(instance).to.be.ok;
    });

});
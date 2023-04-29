import {expect, assert} from 'chai';
import CustomSequelize from "../../../utils/configure/CustomSequelize.js";
import DummyData from "../../../../dummy/DummyData.js";
import Zodiac from "../Zodiac.js";

describe('Zodiac', () => {
    const sequelize = new CustomSequelize();

    before(async () => {
        await sequelize.sync();
    });

    after(async () => {
        await sequelize.close();
    });

    it('데이터 생성 및 확인', async () => {
        const zodiacList = await Zodiac.bulkCreate(DummyData.dummyZodiacList);
        expect(zodiacList).to.be.ok;
    });

    it('데이터 조회', async () => {
        const instances = await Zodiac.findAll();
        expect(instances).to.be.ok;
    });
});
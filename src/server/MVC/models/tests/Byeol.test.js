import {expect, assert} from 'chai';
import Byeol from '../Byeol.js';
import CustomSequelize from "../../../utils/configure/CustomSequelize.js";
import DummyData from "../../../../dummy/DummyData.js";
import Zodiac from "../Zodiac.js";
import _ from 'lodash';
import CustomProcess from "../../../utils/configure/CustomProcess.js";
const {sample} = _;

describe('Byeol', () => {
    const process = new CustomProcess('test')
    const sequelize = new CustomSequelize(process);
    let zodiacList;

    before(async () => {
        await sequelize.sync();
        zodiacList = await Zodiac.bulkCreate(DummyData.dummyZodiacList);
    });

    after(async () => {
        await sequelize.close();
    });

    it('데이터 생성 및 확인', async () => {
        const dummyByeolList = DummyData.dummyByeolList.map((byeol, index) => {
            byeol.zodiacId = sample(zodiacList).id;
            return byeol;
        });
        const byeolList = await Byeol.bulkCreate(dummyByeolList);

        expect(byeolList).to.be.ok;
    });

    it('데이터 조회', async () => {
        const instances = await Byeol.findAll();
        expect(instances).to.be.ok;
    });
});

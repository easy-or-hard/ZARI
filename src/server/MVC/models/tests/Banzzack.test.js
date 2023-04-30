import {expect} from 'chai';
import Byeol from '../Byeol.js';
import Banzzack from "../Banzzack.js";
import CustomSequelize from "../../../utils/configure/CustomSequelize.js";
import DummyData from "../../../../dummy/DummyData.js";
import _ from 'lodash';
import Zodiac from "../Zodiac.js";
import CustomProcess from "../../../utils/configure/CustomProcess.js";
const {sample} = _;

describe('Banzzack', () => {
    const process = new CustomProcess('test')
    const sequelize = new CustomSequelize(process);
    let zodiacList;

    before(async () => {
        await sequelize.sync();
        zodiacList = await Zodiac.bulkCreate(DummyData.dummyZodiacList);
        const dummyByeolList = DummyData.dummyByeolList.map((byeol, index) => {
            byeol.zodiacId = sample(zodiacList).id;
            return byeol;
        });
        const byeolList = await Byeol.bulkCreate(dummyByeolList);
    });

    after(async () => {
        await sequelize.close();
    });

    it('데이터 생성 및 확인 01', async () => {
        const byeolList = await Byeol.findAll();
        const byeol = sample(byeolList);
        const message = DummyData.randomGreeting;
        const banzzackInstance = await Banzzack.create({ message: message, byeolId: byeol.id});

        expect(banzzackInstance).to.be.ok;

        expect(banzzackInstance.byeolId).to.be.equal(byeol.id);
        expect(banzzackInstance.message).to.be.equal(message);
    });

    it( '데이터 조회', async () => {
        const instances = await Banzzack.findAll();
        expect(instances).to.be.ok;
    });
});

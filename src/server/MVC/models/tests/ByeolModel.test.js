import { expect, assert } from 'chai';
import ByeolModel from '../ByeolModel.js';
import {Op} from "sequelize";
import CustomSequelize from "../../../utils/configure/CustomSequelize.js";

describe('ByeolModel', () => {
    const sequelize = new CustomSequelize('local');

    before(async () => {
        await sequelize.sync();
    });

    after(async () => {
        await sequelize.close();
    });

    it('데이터 생성 및 확인', async () => {
        const byeol = '킹태희'
        const instance1 = await ByeolModel.create({ byeol });
        const instance2 = await ByeolModel.findOne({
            where: { byeol: { [Op.eq]: byeol } }
        });

        expect(instance1).to.be.ok;
        expect(instance2).to.be.ok;
        assert.deepEqual(instance1.byeol, instance2.byeol, '데이터가 같아야 한다.');
    });

    it( '데이터 조회', async () => {
        const instances = await ByeolModel.findAll();
        expect(instances).to.be.ok;
    });
});

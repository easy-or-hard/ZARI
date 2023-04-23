import { expect } from 'chai';
import ZariModel from '../ZariModel.js';
import ByeolModel from '../ByeolModel.js';
import CustomSequelize from "../../../utils/configure/CustomSequelize.js";

describe('ZariModel', () => {
    const sequelize = new CustomSequelize('local');

    before(async () => {
        await sequelize.sync();
    });

    after(async () => {
        await sequelize.close();
    });

    it('데이터 생성 및 확인 01', async () => {
        const byeol = '킹태희';
        const byeolInstance = await ByeolModel.create({ byeol });
        const zari = '묫';
        const zariInstance = await ZariModel.create({ zari, byeolId: byeolInstance.id });

        expect(zariInstance).to.be.ok;
        expect(zariInstance.zari).to.be.equal(zari);
        expect(zariInstance.byeolId).to.be.equal(byeolInstance.id);
    });

    it( '데이터 조회', async () => {
        const instances = await ZariModel.findAll();
        expect(instances).to.be.ok;
    });
});

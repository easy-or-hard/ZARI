import { expect } from 'chai';
import Zari from '../Zari.js';
import Byeol from '../Byeol.js';
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
        const byeolInstance = await Byeol.create({ byeol });
        const zari = '묫';
        const zariInstance = await Zari.create({ zari, byeolId: byeolInstance.id });

        expect(zariInstance).to.be.ok;
        expect(zariInstance.zari).to.be.equal(zari);
        expect(zariInstance.byeolId).to.be.equal(byeolInstance.id);
    });

    it( '데이터 조회', async () => {
        const instances = await Zari.findAll();
        expect(instances).to.be.ok;
    });
});

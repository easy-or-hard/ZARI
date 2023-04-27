import { expect } from 'chai';
import ZariModel from '../Zari.js';
import ByeolModel from '../Byeol.js';
import BanzzackModel from "../Banzzack.js";
import CustomSequelize from "../../../utils/configure/CustomSequelize.js";

describe('BanzzackModel', () => {
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
        const banzzack = '앙기모띠, 메시지 입니다.';
        const banzzackInstance = await BanzzackModel.create({ banzzack, byeolId: byeolInstance.id, zariId: zariInstance.id });

        expect(byeolInstance).to.be.ok;
        expect(zariInstance).to.be.ok;
        expect(banzzackInstance).to.be.ok;

        expect(byeolInstance.byeol).to.be.equal(byeol);
        expect(zariInstance.zari).to.be.equal(zari);
        expect(banzzackInstance.banzzack).to.be.equal(banzzack);
    });

    it( '데이터 조회', async () => {
        const instances = await BanzzackModel.findAll();
        expect(instances).to.be.ok;
    });
});

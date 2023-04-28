import { expect } from 'chai';
import Zari from '../Zari.js';
import Byeol from '../Byeol.js';
import Banzzack from "../Banzzack.js";
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
        const byeol = {
            byeol: '킹태희',
            providerId: Math.floor(Math.random() * 100000000) + 1,
            provider: 'test',
        }
        const byeolInstance = await Byeol.create(byeol);
        const zari = `묫${Math.floor(Math.random() * 10000) + 1}`;
        const zariInstance = await Zari.create({ zari, ByeolId: byeolInstance.id });
        const banzzack = '앙기모띠, 메시지 입니다.';
        const banzzackInstance = await Banzzack.create({ banzzack, ByeolId: byeolInstance.id, ZariId: zariInstance.id });

        expect(byeolInstance).to.be.ok;
        expect(zariInstance).to.be.ok;
        expect(banzzackInstance).to.be.ok;

        expect(byeolInstance.byeol).to.be.equal(byeol.byeol);
        expect(zariInstance.zari).to.be.equal(zari);
        expect(banzzackInstance.banzzack).to.be.equal(banzzack);
    });

    it( '데이터 조회', async () => {
        const instances = await Banzzack.findAll();
        expect(instances).to.be.ok;
    });
});

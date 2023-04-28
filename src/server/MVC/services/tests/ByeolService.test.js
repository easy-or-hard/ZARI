import {expect, assert} from 'chai';
import ByeolService from "../ByeolService.js";
import CustomSequelize from "../../../utils/configure/CustomSequelize.js";
describe('ByeolModel', () => {
    const sequelize = new CustomSequelize();
    const byeolService = new ByeolService();
    let byeolId;

    before(async () => {
        await sequelize.sync();
        const byeol = {
            byeol: '킹태희',
            providerId: Math.floor(Math.random() * 100000000) + 1,
            provider: 'test',
        }
        const instance = await byeolService.create(byeol);
        byeolId = instance.id;
    });

    after(async () => {
        await sequelize.close();
    });


    it('별 생성 및 확인', async () => {
        const byeol = {
            byeol: '킹태희',
            providerId: Math.floor(Math.random() * 100000000) + 1,
            provider: 'test',
        }
        const instance = await byeolService.create(byeol);

        expect(instance).to.be.ok;
        expect(instance.byeol).to.be.equal(byeol.byeol);
        assert.equal(instance.providerId, byeol.providerId, '데이터가 같다.');
    });


    it( '별 조회', async () => {
        const instances = await byeolService.read(byeolId);
        expect(instances).to.be.ok;
        expect(instances.id).to.be.equal(byeolId);
    });

    it('자리를 포함한 별 조회', async () => {
        const instances = await byeolService.findByPk(byeolId);
        expect(instances).to.be.ok;
    });

    it('여러 별 조회', async () => {
        const instances = await byeolService.readAll();
        expect(instances).to.be.ok;
    });

    it('여러 별 페이징으로 조회', async () => {
        const pageSize = 3;
        const instances = await byeolService.readAll(1, pageSize);
        expect(instances).to.be.ok;
        assert.isAtMost(instances.length, pageSize, `데이터가 ${pageSize} 개 이하로 출력되어야 한다.`);
    });

    it('별 수정', async () => {
        const byeolId = 1;
        const byeol = '앙_테스트띠';
        const instances = await byeolService.updateByeol(byeolId, byeol);

        expect(instances).to.be.ok;
        expect(instances.byeol).to.be.equal('별이 있다.');
        assert.equal(instances.id, byeolId, '별 아이디가 같다.');
        assert.equal(instances.byeol, byeol, '별이 같다.');
    });

});
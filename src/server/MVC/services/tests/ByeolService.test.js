import {expect, assert} from 'chai';
import ByeolService from "../ByeolService.js";
import CustomSequelize from "../../../utils/configure/CustomSequelize.js";
import Zodiac from "../../models/Zodiac.js";
import DummyData from "../../../../dummy/DummyData.js";
import _ from 'lodash';
const {sample} = _;
describe('ByeolModel', () => {
    const sequelize = new CustomSequelize();
    const byeolService = new ByeolService();
    let byeolId;
    let zodiacList;

    before(async () => {
        await sequelize.sync();
        zodiacList = await Zodiac.bulkCreate(DummyData.dummyZodiacList);
    });

    after(async () => {
        await sequelize.close();
    });

    it('별 생성 및 확인', async () => {
        const byeol = {
            name: '킹태희',
            providerId: Math.floor(Math.random() * 100000000) + 1,
            provider: 'test',
            zodiacId: sample(zodiacList).id
        }
        const instance = await byeolService.create(byeol);

        expect(instance).to.be.ok;
        expect(instance.name).to.be.equal(byeol.name);
        assert.equal(instance.providerId, byeol.providerId, '데이터가 같다.');
    });


    it( '별 조회', async () => {
        const temp = 1;
        const tempId = temp || byeolId;
        const instances = await byeolService.read(tempId);
        expect(instances).to.be.ok;
        expect(instances.id).to.be.equal(tempId);
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
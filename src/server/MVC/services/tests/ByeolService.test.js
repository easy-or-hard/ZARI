import {expect, assert} from 'chai';
import ByeolService from "../ByeolService.js";
import CustomSequelize from "../../../lib/configure/CustomSequelize.js";
import Zodiac from "../../models/Zodiac.js";
import DummyData from "../../../../dummy/DummyData.js";
import _ from 'lodash';
import CustomProcess from "../../../lib/configure/CustomProcess.js";
const {sample} = _;
describe('ByeolModel', () => {
    const customProcess = new CustomProcess('test');
    const sequelize = new CustomSequelize({_customProcess: customProcess});
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
        const id = 1;
        const name = '앙_테스트띠';
        const instances = await byeolService.updateName({id}, name);

        expect(instances).to.be.ok;
        assert.equal(instances.id, id, '별 아이디가 같다.');
        assert.equal(instances.name, name, '별 이름이 같다.');
    });

});
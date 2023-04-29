import {expect, assert} from 'chai';
import BanzzackService from "../BanzzackService.js";
import CustomSequelize from "../../../utils/configure/CustomSequelize.js";
import Zodiac from "../../models/Zodiac.js";
import DummyData from "../../../../dummy/DummyData.js";
import _ from 'lodash';
import Byeol from "../../models/Byeol.js";
import Banzzack from "../../models/Banzzack.js";

const {sample} = _;
describe('ByeolModel', () => {
    const sequelize = new CustomSequelize();
    const banzzackService = new BanzzackService();
    let zodiacList, byeolList, byeol;

    before(async () => {
        await sequelize.sync();

        zodiacList = await Zodiac.bulkCreate(DummyData.dummyZodiacList);

        const dummyByeolList = DummyData.dummyByeolList.map((byeol, index) => {
            byeol.zodiacId = sample(zodiacList).id;
            return byeol;
        });
        byeolList = await Byeol.bulkCreate(dummyByeolList);

        for(let i = 0; i < 150; i++){
            byeol = sample(byeolList);
            const banzzack = {
                message: DummyData.randomGreeting
            }
            await banzzackService.create(byeol, banzzack);
        }
    });

    after(async () => {
        await sequelize.close();
    });


    it('별 생성 및 확인', async () => {
        const byeol = sample(byeolList);
        const banzzack = {
            message: sample(DummyData.randomGreeting)
        }
        const instance = await banzzackService.create(byeol, banzzack);

        expect(instance).to.be.ok;
        expect(instance.message).to.be.equal(banzzack.message);
    });

    it('별 수정', async () => {
        const byeol = sample(byeolList);
        const condition = {
            where: {
                byeolId: byeol.id
            }
        }
        const banzzackList = await Banzzack.findAll(condition);
        const banzzack = sample(banzzackList);
        banzzack.message = `내용 변경 테스트, 원문 => ${banzzack.message}`;

        const instance = await banzzackService.update(byeol, banzzack);

        expect(instance).to.be.ok;
        expect(instance.message).to.be.equal(banzzack.message);
    });

});
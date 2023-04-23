import _ from 'lodash';

const {sample} = _;

import ByeolModel from "../server/MVC/models/ByeolModel.js";
import ZariModel from "../server/MVC/models/ZariModel.js";
import BanzzackModel from "../server/MVC/models/BanzzackModel.js";


const dummy = [
    {byeol: '나루토', zari: '호랑이'},
    {byeol: '사스케', zari: '고양이'},
    {byeol: '루피', zari: '늑대'},
    {byeol: '조로', zari: '거북이'},
    {byeol: '이치고', zari: '토끼'},
    {byeol: '나미', zari: '사자'},
    {byeol: '루시', zari: '기린'},
    {byeol: '에르자', zari: '코끼리'},
    {byeol: '아스카', zari: '다람쥐'},
    {byeol: '신지', zari: '펭귄'},
    {byeol: '쿄스케', zari: '여우'},
    {byeol: '토루', zari: '늑대구'},
    {byeol: '유키', zari: '강아지'},
    {byeol: '미코토', zari: '침팬지'},
    {byeol: '라키', zari: '팬더'},
    {byeol: '레이', zari: '두더지'},
    {byeol: '미사토', zari: '코알라'},
    {byeol: '타카시', zari: '물소'},
    {byeol: '히카루', zari: '물범'},
    {byeol: '하루히', zari: '나무늘보'},
    {byeol: '리코', zari: '원숭이'},
    {byeol: '카이', zari: '알파카'},
    {byeol: '시온', zari: '기린소'},
    {byeol: '유우', zari: '바다코끼리'},
    {byeol: '마사', zari: '히포그리프'},
    {byeol: '코가', zari: '도마뱀'},
    {byeol: '레나', zari: '수달'},
    {byeol: '아야', zari: '개미'},
    {byeol: '마키', zari: '거미'},
    {byeol: '켄타', zari: '치타'},
    {byeol: '카논', zari: '비단벌레'},
    {byeol: '미치루', zari: '참새'},
    {byeol: '유이', zari: '불나방'},
    {byeol: '유리코', zari: '사슴'}
]

const greetings = [
    '안녕하세요! 오늘 하루도 행복한 일만 가득하시길 바랍니다.',
    '즐거운 하루 되세요! 그 어떤 일도 당신을 좌절시키지 못하도록 힘내세요.',
    '행운이 가득한 하루 되세요. 모든 일이 당신의 희망대로 이루어지길 바랍니다.',
    '안녕히 계세요! 조용한 하루 보내시길 바랍니다.',
    '좋은 하루 보내세요. 세상이 더욱 밝아지는 날이 되길 기원합니다.',
    '새로운 일에 도전하는 하루 되세요. 당신의 가능성은 무궁무진합니다.',
    '오늘 하루도 최선을 다하고 행복을 찾아보세요. 당신의 미래가 밝아질 것입니다.',
    '잘 다녀오세요. 언제든지 당신을 응원합니다.',
    '다음에 또 뵙겠습니다. 행운이 당신과 함께하기를 기원합니다.',
    '건강하고 행복한 하루 되세요. 오늘도 당신은 특별합니다.',
    '화이팅! 모든 것이 당신의 희망대로 일어날 것입니다.',
    '푹 쉬세요. 내일은 더욱 더 잘 할 수 있습니다.',
    '감기 조심하세요. 몸조리 잘 하시길 바랍니다.',
    '고생 많으셨어요. 모든 것이 보람찬 일이 되길 기원합니다.',
    '좋은 소식 들어왔으면 좋겠어요. 당신의 행운이 무궁무진하기를 기원합니다.',
    '건강한 하루 보내세요. 당신이 행복한 모습으로 돌아오길 기대합니다.',
    '일 잘하고 오세요. 모든 일이 당신의 희망대로 이루어질 것입니다.',
    '고맙습니다. 당신과 함께할 수 있어서 감사합니다.',
    '화이팅! 오늘도 힘내세요. 당신은 놀라운 일을 이룰 수 있습니다.',
    '여유로운 하루 보내세요. 마음의 여유가 당신의 인생을 더욱 풍요롭게 만들어줄 것입니다.',
    '행운이 항상 당신과 함께하기를 기원합니다. 오늘 하루도 행복하세요.',
    '조심히 가세요. 당신의 안전이 최우선입니다.',
    '건강한 일상을 유지하세요. 당신의 몸과 마음에 귀를 기울이세요.',
    '또 뵈요. 당신을 다시 만날 때까지 건강하고 행복하길 기원합니다.',
    '다음에 또 만나요. 당신과 함께한 시간은 소중한 추억이 될 것입니다.',
    '잘 부탁드립니다. 당신의 가능성을 믿습니다.',
    '고맙습니다. 당신의 도움에 감사합니다.',
    '조심해서 가세요. 모든 일이 당신의 희망대로 이루어질 것입니다.',
    '괜찮아질 거예요. 당신은 모든 상황을 이겨낼 수 있습니다.',
    '기운 내세요. 당신의 행운이 항상 함께하기를 기원합니다.',
    '당신은 특별합니다. 행복한 하루 보내세요.',
    '힘내서 해보세요. 당신의 가능성은 무궁무진합니다.',
    '소중한 하루 보내세요. 오늘도 당신은 특별합니다.',
    '화이팅! 내일은 더욱 더 잘할 수 있습니다.',
    '감사합니다. 당신과 함께한 시간은 소중한 추억이 될 것입니다.',
    '건강하고 행복한 하루 되세요. 모든 일이 당신의 희망대로 이루어지길 기원합니다.',
    '언제든지 당신을 지지합니다. 당신의 미래에 대해 무한한 기대를 가지고 있습니다.',
    '모든 일이 당신의 희망대로 이루어지길 기원합니다. 당신은 놀라운 일을 이룰 수 있습니다.',
    '오늘도 최선을 다하고 행복을 찾아보세요. 당신의 미래가 밝아질 것입니다.',
    '즐거운 휴식을 취하세요. 당신은 자신에게 필요한 휴식을 가장 잘 압니다.',
    '당신이 원하는 모든 것을 이루기를 기원합니다. 행복한 하루 보내세요.',
    '건강과 행복이 함께하기를 기원합니다. 모든 일이 당신의 희망대로 이루어질 것입니다.',
    '살아있으니 다행이에요! 좋은 하루 되세요.',
    '안녕하세요, 오늘 하루도 힘내세요!',
    '지금부터 좋은 일만 생길거에요. 화이팅!',
    '좋은 기운이 가득한 하루 보내세요!',
    '행복한 하루 보내시길 바랍니다. 오늘도 당신은 최고예요.',
    '하루하루가 행복하고 즐거운 일만 가득하길 바랍니다.',
    '새로운 출발을 응원합니다! 오늘도 화이팅!',
    '오늘 하루도 웃음 가득하길 기원합니다.',
    '불금에는 즐기고 월요일에는 힘내세요!',
    '행복한 마음으로 하루를 시작하세요. 모든 일이 행복하게 마무리 됩니다.',
    '힘들더라도 흔들리지 마세요. 당신은 충분히 강합니다.',
    '기쁨과 행복이 가득한 하루 되세요.',
    '모든 것이 잘되기를 기원합니다. 오늘 하루도 힘내세요!',
    '세상에서 가장 행복한 사람이 되세요!',
    '새로운 시작을 응원합니다. 오늘도 화이팅하세요.',
    '하루하루 미소를 잃지 말고 즐겁게 보내세요.',
    '행복한 하루 시작되길 바랍니다. 당신은 특별합니다.',
    '일의 어려움이 당신의 능력을 더욱 높이게 만들 거에요.',
    '자신감 가득한 하루 보내세요. 당신은 멋진 사람입니다.',
    '괜찮아요. 오늘 하루만 힘내보아요!',
    '지친 하루 끝, 힘든 하루가 지나가고 행복한 내일이 찾아올 거예요.',
    '일상에 지친 당신, 오늘 하루는 쉬어가세요.',
    '즐거운 마음으로 하루를 시작해보아요.',
    '긍정적인 생각이 우리의 삶을 바꿔놓는다는 걸 잊지 마세요.',
    '행복과 즐거움이 넘치는 하루 되세요.',
    '새로운 일을 시작할 때면, 항상 믿음과 강한 의지가 필요합니다.',
    '오늘 하루도 무사히 마무리하시길 바랍니다.'
]

export default class DummyRunner {
    static #instance;

    constructor() {
        if (this.constructor.#instance) {
            return this.constructor.#instance;
        }
        this.constructor.#instance = this;
    }

    async insertDemoData() {
        await ByeolModel.sync({force: true});
        await ZariModel.sync({force: true});
        await BanzzackModel.sync({force: true});
        const dummyByeolList = await this.createDummyByeolData();
        const dummyZariList = await this.createDummyZariData(dummyByeolList);
        await this.createDummyBanzzackData(dummyByeolList, dummyZariList);
    }


    async createDummyByeolData() {
        let createdByeolList;

        try {
            createdByeolList = await ByeolModel.bulkCreate(dummy);

            console.log('Dummy data created:', createdByeolList.map(byeol => byeol.toJSON()));
        } catch (error) {
            console.error('Error creating dummy data:', error);
        }

        return createdByeolList;
    }

    async createDummyZariData(dummyByeolList) {
        const createdZariList = [];

        try {
            for (let i = 0; i < dummyByeolList.length; i++) {
                const byeol = dummyByeolList[i];
                const zari = await byeol.createZari({
                    zari: dummy[i].zari
                });
                createdZariList.push(zari);
            }
            console.log('ZariModel data associated with ByeolModel');
        } catch (error) {
            console.error('Error creating and associating ZariModel data:', error);
        }

        return createdZariList;
    }

    async createDummyBanzzackData(dummyByeolList, dummyZariList) {
        try {
            for (const zari of dummyZariList) {
                for (let i = 0; i < 5; i++) {
                    const byeol = sample(dummyByeolList.filter(byeol => byeol.zari !== zari));
                    const greeting = sample(greetings);

                    let banzzack = await BanzzackModel.create({
                        banzzack: greeting,
                        zariId: zari.id,
                        byeolId: byeol.id
                    });

                    // await banzzack.setByeol(byeol);
                    // await banzzack.setZari(zari);
                }
            }
            console.log('Banzzack data associated with ByeolModel and ZariModel');
        } catch (error) {
            console.error('Error creating and associating Banzzack data:', error);
        }
    }
}

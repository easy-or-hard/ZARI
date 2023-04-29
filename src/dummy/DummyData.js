import _ from 'lodash';
const {sample} = _;

export default class DummyData {
    static get dummyZodiacList() {return this.zodiacList;};
    static get randomZodiac() {return sample(this.zodiacList);};

    static get dummyByeolList() {return this.dummyByeolList;}
    static get randomByeol() {return sample(this.dummyByeolList);}

    static get dummyGreetingList() {return this.greetingList;}
    static get randomGreeting() {return sample(this.greetingList);}

    static dummyByeolList = [
        {name: '나루토', provider: 'none', providerId: 1},
        {name: '사스케', provider: 'none', providerId: 2},
        {name: '루피', provider: 'none', providerId: 3},
        {name: '조로', provider: 'none', providerId: 4},
        {name: '이치고', provider: 'none', providerId: 5},
        {name: '나미', provider: 'none', providerId: 6},
        {name: '루시', provider: 'none', providerId: 7},
        {name: '에르자', provider: 'none', providerId: 8},
        {name: '아스카', provider: 'none', providerId: 9},
        {name: '신지', provider: 'none', providerId: 10},
        {name: '쿄스케', provider: 'none', providerId: 11},
        {name: '토루', provider: 'none', providerId: 12},
        {name: '유키', provider: 'none', providerId: 13},
        {name: '미코토', provider: 'none', providerId: 14},
        {name: '라키', provider: 'none', providerId: 15},
        {name: '레이', provider: 'none', providerId: 16},
        {name: '미사토', provider: 'none', providerId: 17},
        {name: '타카시', provider: 'none', providerId: 18},
        {name: '히카루', provider: 'none', providerId: 19},
        {name: '하루히', provider: 'none', providerId: 20},
        {name: '리코', provider: 'none', providerId: 21},
        {name: '카이', provider: 'none', providerId: 22},
        {name: '시온', provider: 'none', providerId: 23},
        {name: '유우', provider: 'none', providerId: 24},
        {name: '마사', provider: 'none', providerId: 25},
        {name: '코가', provider: 'none', providerId: 26},
        {name: '레나', provider: 'none', providerId: 27},
        {name: '아야', provider: 'none', providerId: 28},
        {name: '마키', provider: 'none', providerId: 29},
        {name: '켄타', provider: 'none', providerId: 30},
        {name: '카논', provider: 'none', providerId: 31},
        {name: '미치루', provider: 'none', providerId: 32},
        {name: '유이', provider: 'none', providerId: 33},
        {name: '유리코', provider: 'none', providerId: 34}
    ];

    static greetingList = [
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
    ];

    static zodiacList = [
        {
            name: '물병자리',
            startMonth: 1,
            startDay: 20,
            endMonth: 2,
            endDay: 18
        },
        {
            name: '물고기자리',
            startMonth: 2,
            startDay: 19,
            endMonth: 3,
            endDay: 20
        },
        {
            name: '양자리',
            startMonth: 3,
            startDay: 21,
            endMonth: 4,
            endDay: 19
        },
        {
            name: '황소자리',
            startMonth: 4,
            startDay: 20,
            endMonth: 5,
            endDay: 20
        },
        {
            name: '쌍둥이자리',
            startMonth: 5,
            startDay: 21,
            endMonth: 6,
            endDay: 20
        },
        {
            name: '게자리',
            startMonth: 6,
            startDay: 21,
            endMonth: 7,
            endDay: 22
        },
        {
            name: '사자자리',
            startMonth: 7,
            startDay: 23,
            endMonth: 8,
            endDay: 22
        },
        {
            name: '처녀자리',
            startMonth: 8,
            startDay: 23,
            endMonth: 9,
            endDay: 22
        },
        {
            name: '천칭자리',
            startMonth: 9,
            startDay: 23,
            endMonth: 10,
            endDay: 22
        },
        {
            name: '전갈자리',
            startMonth: 10,
            startDay: 23,
            endMonth: 11,
            endDay: 21
        },
        {
            name: '사수자리',
            startMonth: 11,
            startDay: 22,
            endMonth: 12,
            endDay: 21
        },
        {
            name: '염소자리',
            startMonth: 12,
            startDay: 22,
            endMonth: 1,
            endDay: 19
        }
    ];
}
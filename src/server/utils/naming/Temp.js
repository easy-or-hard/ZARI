export default class Temp {
    static generateRandomKoreanName() {
        const syllables = [
            '가', '나', '다', '라', '마', '바', '사', '아', '자', '차', '카', '타', '파', '하',
            '악', '넉', '덕', '륵', '묵', '북', '삭', '억', '적', '척', '칙', '탁', '팍', '학',
            '앙', '넝', '덩', '렁', '뭉', '봉', '송', '양', '정', '청', '켱', '통', '퐁', '홍'
        ];

        const nameLength = Math.floor(Math.random() * 5) + 4; // Random length between 4 and 8
        let name = '';

        for (let i = 0; i < nameLength; i++) {
            name += syllables[Math.floor(Math.random() * syllables.length)];
        }

        return name;
    }
}
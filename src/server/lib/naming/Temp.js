export default class Temp {
    static generateRandomKoreanName() {
        const familyNames = [
            '김', '이', '박', '최', '정', '강', '조', '윤', '장', '임',
            '오', '한', '신', '서', '권', '황', '안', '송', '류', '홍'
        ];

        const givenNameFirstSyllables = [
            '민', '지', '수', '영', '재', '윤', '현', '선', '주', '희',
            '태', '종', '준', '유', '진', '은', '찬', '호', '원', '철'
        ];

        const givenNameSecondSyllables = [
            '후', '영', '원', '준', '현', '희', '수', '진', '철', '우',
            '성', '민', '지', '찬', '윤', '은', '호', '예', '하', '태'
        ];

        const familyName = familyNames[Math.floor(Math.random() * familyNames.length)];
        const givenNameFirst = givenNameFirstSyllables[Math.floor(Math.random() * givenNameFirstSyllables.length)];
        const givenNameSecond = givenNameSecondSyllables[Math.floor(Math.random() * givenNameSecondSyllables.length)];

        const randomNumber = Math.floor(Math.random() * 10000).toString().padStart(4, '0');

        return familyName + givenNameFirst + givenNameSecond + randomNumber;
    }
}
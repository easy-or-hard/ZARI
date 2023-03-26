let ZodiacUniverses = [
    {
        name: '퍼렁별 유니버스'
    },
    {
        name: '바오밥나무 별'
    },
    {
        name: '토끼별'
    },
    {
        name: '물고기별'
    },
    {
        name: '앙기모디별'
    },
    {
        name: 'aa'
    }
]

export default class ZodiacUniverseModel {
    static #instance;
    #zodiacUniverses = ZodiacUniverses;

    constructor() {
        if (ZodiacUniverseModel.#instance) {
            return ZodiacUniverseModel.#instance;
        }
        ZodiacUniverseModel.#instance = this;
    }

    readAll = async () => {
        return this.#zodiacUniverses;
    }

    readById = async (name) => {
        return this.#zodiacUniverses.find(zodiacUniverse => zodiacUniverse.name === name) || {};
    }

    create = async (name) => {
        return this.#zodiacUniverses.length < this.#zodiacUniverses.push({name}) ? {name} : {};
    }
}
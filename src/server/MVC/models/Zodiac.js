import {DataTypes, Model} from "sequelize";
import Byeol from "./Byeol.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     Zodiac:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: 황도궁 ID
 *         zodiac:
 *           type: string
 *           description: 황도궁 이름
 *         startMonth:
 *           type: integer
 *           description: 황도궁 시작 월
 *         startDay:
 *           type: integer
 *           description: 황도궁 시작 일
 *         endMonth:
 *           type: integer
 *           description: 황도궁 종료 월
 *         endDay:
 *           type: integer
 *           description: 황도궁 종료 일
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: 레코드 생성 일시
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: 레코드 수정 일시
 */

export default class Zodiac extends Model {
    static initialize(sequelize) {
        super.init(
            {
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },
                startMonth: {
                    type: DataTypes.SMALLINT,
                    allowNull: false,
                },
                startDay: {
                    type: DataTypes.SMALLINT,
                    allowNull: false,
                },
                endMonth: {
                    type: DataTypes.SMALLINT,
                    allowNull: false,
                },
                endDay: {
                    type: DataTypes.SMALLINT,
                    allowNull: false,
                },
            },
            { sequelize });
    }

    static associate() {
        this.hasMany(Byeol, {as: 'byeol', foreignKey: 'zodiacId'});
    }
}
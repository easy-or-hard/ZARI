import {Model, DataTypes} from 'sequelize';
import Banzzack from "./Banzzack.js";
import Zodiac from "./Zodiac.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     Byeol:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: 별 ID
 *           example: 1
 *         byeol:
 *           type: string
 *           description: 별 이름
 *           example: "느와르킹태희"
 *         providerId:
 *           type: integer
 *           description: 제공자 ID
 *           example: 123456789
 *         provider:
 *           type: string
 *           description: 제공자
 *           example: "github"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: 레코드 생성 일시
 *           example: "2023-04-28T08:28:22.086Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: 레코드 수정 일시
 *           example: "2023-04-28T08:28:22.086Z"
 */
export default class Byeol extends Model {
    static initialize(sequelize) {
        super.init(
            {
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true
                },
                providerId: {
                    type: DataTypes.BIGINT,
                    allowNull: false,
                    unique: 'authUnique',
                },
                provider: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: 'authUnique',
                },
                zodiacId: {
                    type: DataTypes.INTEGER,
                }
            },
            {sequelize});
    }

    static associate() {
        this.belongsTo(Zodiac, {as: 'zodiac', foreignKey: 'zodiacId'})
        this.hasMany(Banzzack, {as: 'banzzackList', onDelete: 'cascade'});
    }
}
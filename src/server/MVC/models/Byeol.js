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
 *           example: 1
 *         byeol:
 *           type: string
 *           example: "느와르킹태희"
 *         providerId:
 *           type: integer
 *           example:
 *         provider:
 *           type: string
 *           example: "github"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-04-28T08:28:22.086Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
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
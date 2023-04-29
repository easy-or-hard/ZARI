import {Model, DataTypes} from 'sequelize';
import Banzzack from "./Banzzack.js";
import Zodiac from "./Zodiac.js";

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
                    allowNull: false
                }
            },
            { sequelize });
    }

    static associate() {
        this.belongsTo(Zodiac, {foreignKey: 'zodiacId'})
        this.hasMany(Banzzack, {onDelete: 'cascade'});
    }
}
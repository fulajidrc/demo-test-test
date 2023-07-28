const sequelize = require("sequelize");
const db = require("../config/database.config");
var leave = db.define(
    "leave",
    {
        id: { type: sequelize.INTEGER, primaryKey: true, autoIncrement: true, },
        date: {type: sequelize.DATE},
        UserId: { type: sequelize.INTEGER },
        type: {type: sequelize.ENUM('casual', 'sick','emergency'), defaultValue: 'casual'},
        status: {type: sequelize.ENUM('pending', 'approved'), defaultValue: 'pending'}
    },
    {
        freezeTableName: false,
        timestamps: true,
    }
);
module.exports = leave;
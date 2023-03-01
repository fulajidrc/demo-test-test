const sequelize = require("sequelize");
const db = require("../config/database.config");
var user = db.define(
    "user",
    {
        id: { type: sequelize.INTEGER, primaryKey: true },
        username: { type: sequelize.STRING },
        password: { type: sequelize.STRING },
        token: { type: sequelize.STRING },
    },
    {
        freezeTableName: false,
        // dont use createdAt/update
        timestamps: true,
    }
);
module.exports = user;
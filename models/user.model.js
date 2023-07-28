const sequelize = require("sequelize");
const db = require("../config/database.config");
var user = db.define(
    "user",
    {
        id: { type: sequelize.INTEGER, primaryKey: true, autoIncrement: true, },
        name: {type: sequelize.STRING},
        email: { type: sequelize.STRING },
        password: { type: sequelize.STRING },
        role: {type: sequelize.ENUM('employee', 'manager')},
        token: { type: sequelize.STRING },
    },
    {
        freezeTableName: false,
        // dont use createdAt/update
        timestamps: true,
    }
);
module.exports = user;
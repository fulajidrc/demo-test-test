const userController = require("./user.controller");
const leaveController = require("./leave.controller");
var controllers = {};
controllers.user = userController;
controllers.leave = leaveController;
module.exports = controllers;
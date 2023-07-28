const userRoute = require("./user.route");
const authRoute = require('./auth.route')
const leaveRoute = require("./leave.route")
const routers = {};
routers.user = userRoute;
routers.auth = authRoute;
routers.leave = leaveRoute;
module.exports = routers;
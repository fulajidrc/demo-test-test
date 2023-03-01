const userRoute = require("./user.route");
const authRoute = require('./auth.route')
const routers = {};
routers.user = userRoute;
routers.auth = authRoute;
module.exports = routers;
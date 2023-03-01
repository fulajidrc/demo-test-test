const authMiddleware = require("./auth.middleware");
var middlewares = {};
middlewares.auth = authMiddleware;
module.exports = middlewares;
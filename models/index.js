const User = require("./user.model");

const Leave = require('./leave.model')
const dbInit = () => {
    User.sync({ alter: true });
    Leave.sync({ alter: true });
}
module.exports = {dbInit, User, Leave};
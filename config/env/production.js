require("dotenv").config();
module.exports = {
    db_url: `mongodb://${process.env.USER_ROOT_DATABASE}:${process.env.PASSWORD_ROOT_DATABASE}@${process.env.HOST_DATABASE}:${process.env.PORT_DATABASE}`,
    db_name:`train_c`
};
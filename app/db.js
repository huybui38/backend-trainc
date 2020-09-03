const mongodb = require("mongodb");

var _db;

module.exports = async function () {
    await mongodb.connect(
        `mongodb://${process.env.USER_ROOT_DATABASE}:${process.env.PASSWORD_ROOT_DATABASE}@localhost:${process.env.PORT_DATABASE}/train_c`,
        { useNewUrlParser: true, useUnifiedTopology: true, authSource: "admin" },
        (error, result) => {
            _db = result.db("train_c");
        }
    );
};

module.exports.getDB = () => {
    return _db;
};

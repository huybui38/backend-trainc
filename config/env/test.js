require("dotenv").config();
module.exports = {
    db_url: process.env.DATABASE_URL,
    db_name: `test_train_c`,
};

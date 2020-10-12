const { AsyncCatch } = require("../../helpers/utils.helper");
const { Unauthorized } = require("../../helpers/errors.helper");
const { User } = require("../../models/User.model");
const { compareHashingString } = require("../../helpers/bcrypt.helper");
const { getUserToken } = require("../../helpers/jwt.helper");
const validator = require("../../helpers/validator.helper");
const validatorSchema = require("../../validators/user.validator");
require("dotenv").config();

module.exports = AsyncCatch(async (req, res, next) => {
    const input = validator(validatorSchema(["code", "password"]), req.body);

    const user = await User.findOne({ code: input.code });
    if (!user) throw new Unauthorized("Student code or password is not correct.");

    const isCorrect = await compareHashingString(input.password, user.password);
    if (!isCorrect) throw new Unauthorized("Student code or password is not correct.");

    const token = getUserToken(user);
    
    if (process.env.NODE_ENV != 'production'){
        res.cookie("token", token, { sameSite: "none" }).send("Login success."); //dev
    }else{
        res.cookie("token", token, { sameSite: "none", secure: true }).send("Login success.");
    }
});

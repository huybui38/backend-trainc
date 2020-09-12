const { AsyncCatch } = require("../../helpers/utils.helper");
const { BadRequest, DefaultError } = require("../../helpers/errors.helper");
const { User } = require("../../models/User.model");
const { hashingString } = require("../../helpers/bcrypt.helper");
const validator = require("../../helpers/validator.helper");

const defaultPassword = "123456789";

const createUser = AsyncCatch(async (req, res, next) => {
    const input = validator(User.validatorSchema(["mssv", "name", "role"]), req.body);
    const user = await User.findOne({ mssv: input.mssv });
    if (user) throw new BadRequest("MSSV is taken.");

    input.password = await hashingString(defaultPassword);

    const result = await User.create(input);
    if (!result) throw new DefaultError("Can't connect to database.");

    res.send("Create user successful.");
});

module.exports = createUser;

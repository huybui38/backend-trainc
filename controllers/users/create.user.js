const { AsyncCatch } = require("../../helpers/utils.helper");
const { BadRequest, DefaultError } = require("../../helpers/errors.helper");
const { User } = require("../../models/User.model");
const { hashingString } = require("../../helpers/bcrypt.helper");
const validator = require("../../helpers/validator.helper");
const validatorSchema = require("../../validators/user.validator");

const defaultPassword = "123456789";

const createUser = AsyncCatch(async (req, res, next) => {
    const input = validator(validatorSchema(["code", "name", "role"]), req.body);
    const user = await User.findOne({ code: input.code });
    if (user) throw new BadRequest("Student code is taken.");

    input.password = await hashingString(defaultPassword);

    const result = await User.create(input);
    if (!result) throw new DefaultError("Can't connect to database.");

    res.send("User was created successfully.");
});

module.exports = createUser;

const { AsyncCatch } = require("../../helpers/utils.helper");
const { DefaultError, BadRequest, STATUS_CODE } = require("../../helpers/errors.helper");
const { User } = require("../../models/User.model");

const createUser = AsyncCatch(async (req, res, next) => {
    const SampleData = {
        firstName: "Ngoc",
        lastName: "Huy",
        email: "test@gmail.com",
        password: "string",
    };
    await User.create(SampleData);
    // throw new DefaultError('Message'); //Message with default status code
    // throw new DefaultError('Message' , STATUS_CODE.BAD_QU); //Message with specific status code
    // throw new BadRequest('Message');  //specific error instance
    res.send("odk");
});

module.exports = createUser;

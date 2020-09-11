const { AsyncCatch } = require("../../helpers/utils.helper");
const { DefaultError, BadRequest, STATUS_CODE } = require("../../helpers/errors.helper");
const { User } = require("../../models/User.model");
const { hashingString, compareHashingString } = require("../../helpers/bcrypt.helper");

const createUser = AsyncCatch(async (req, res, next) => {
    const user = await User.findOne({ mssv: req.input.mssv });
    if (user) throw new BadRequest("MSSV is taken.");

    req.input.password = await hashingString("123456789", 10);

    User.create(req.input);
    // throw new DefaultError('Message'); //Message with default status code
    // throw new DefaultError('Message' , STATUS_CODE.BAD_QU); //Message with specific status code
    // throw new BadRequest('Message');  //specific error instance
    res.send("odk");
});

module.exports = createUser;

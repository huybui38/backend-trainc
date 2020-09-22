const { AsyncCatch } = require("../../helpers/utils.helper");
const { DefaultError, NotFound, Unauthorized, BadRequest } = require("../../helpers/errors.helper");
const { Group } = require("../../models/Group.model");
const { compareHashingString } = require("../../helpers/bcrypt.helper");
const validator = require("../../helpers/validator.helper");
const validatorSchema = require("../../validators/group.validator");

module.exports = AsyncCatch(async (req, res, next) => {
    const group = await Group.findById(req.params.id);
    if (!group) throw new NotFound("Not found.");

    const input = validator(validatorSchema(["password"]), req.body);

    const isCorrect = await compareHashingString(input.password, group.password);
    if (!isCorrect) throw new Unauthorized("Password is not correct.");

    if (group.members.includes(req.user.code)) throw new BadRequest("You have already enrolled.");

    group.members.push(req.user.code);

    const result = await Group.findOneAndUpdate({ _id: group._id }, { $set: { members: group.members } });
    if (!result) throw new DefaultError("Can't connect to database.");

    res.send("Enroll success.");
});

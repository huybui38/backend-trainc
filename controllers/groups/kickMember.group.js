const { AsyncCatch } = require("../../helpers/utils.helper");
const { DefaultError, NotFound, Unauthorized, BadRequest } = require("../../helpers/errors.helper");
const { Group } = require("../../models/Group.model");
const validator = require("../../helpers/validator.helper");
const validatorSchema = require("../../validators/user.validator");
const { User } = require("../../models/User.model");

module.exports = AsyncCatch(async (req, res, next) => {
    const group = await Group.findById(req.params.id);
    if (!group) throw new NotFound("Not found.");

    const input = validator(validatorSchema(["code"]), req.body);

    if (!group.members.includes(input.code)) throw new Unauthorized("Member is not correct.");

    group.members = group.members.filter((member) => member !== input.code);

    const result = await Group.findOneAndUpdate({ _id: group._id }, { $set: { members: group.members } });
    if (!result) throw new DefaultError("Can't connect to database.");

    res.send("Member was deleted successfully.");
});

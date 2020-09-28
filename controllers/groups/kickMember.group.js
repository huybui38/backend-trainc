const { AsyncCatch } = require("../../helpers/utils.helper");
const { DefaultError, NotFound, Unauthorized, BadRequest } = require("../../helpers/errors.helper");
const { Group } = require("../../models/Group.model");
const validator = require("../../helpers/validator.helper");
const validatorSchema = require("../../validators/user.validator");
const { User } = require("../../models/User.model");
const { Mongoose } = require("mongoose");

module.exports = AsyncCatch(async (req, res, next) => {
    const params = validator(validatorSchema(["id"]), req.params);

    const group = await Group.findById(params.id);
    if (!group) throw new NotFound("Not found.");

    const input = validator(validatorSchema(["code"]), req.body);

    if (!group.members.includes(input.code)) throw new Unauthorized("Member is not correct.");

    const result = await Group.findByIdAndUpdate(group._id, { $pull: { members: input.code } });
    if (!result) throw new DefaultError("Can't connect to database.");

    res.send("Member was deleted successfully.");
});

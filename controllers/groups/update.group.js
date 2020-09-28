const { AsyncCatch } = require("../../helpers/utils.helper");
const { BadRequest, DefaultError } = require("../../helpers/errors.helper");
const { Group } = require("../../models/Group.model");
const validator = require("../../helpers/validator.helper");
const validatorSchema = require("../../validators/group.validator");

module.exports = AsyncCatch(async (req, res, next) => {
    const params = validator(validatorSchema(["id"]), req.params);

    const group = await Group.findById(params.id);
    if (!group) throw new BadRequest("Not found.");

    const input = validator(validatorSchema(["name", "active"]), req.body);

    const result = await Group.findByIdAndUpdate(group._id, { $set: { name: input.name, active: input.active } });
    if (!result) throw new DefaultError("Can't connect to database.");

    res.send("Group was updated successfully.");
});

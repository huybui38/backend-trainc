const { AsyncCatch } = require("../../helpers/utils.helper");
const { DefaultError, NotFound, Unauthorized } = require("../../helpers/errors.helper");
const { Group } = require("../../models/Group.model");
const validator = require("../../helpers/validator.helper");
const validatorSchema = require("../../validators/group.validator");

const deleteGroup = AsyncCatch(async (req, res, next) => {
    const group = await Group.findOne({ name: req.params.name });
    if (!group) throw new NotFound("Not found.");

    const input = validator(validatorSchema(["name"]), req.body);
    if (input.name !== group.name) throw new Unauthorized("Name is not correct.");

    const result = await Group.findOneAndDelete({ name: input.name });
    if (!result) throw new DefaultError("Can't connect to database.");

    res.send("Delete group successful.");
});

module.exports = deleteGroup;

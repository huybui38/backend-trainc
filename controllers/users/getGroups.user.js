const { AsyncCatch } = require("../../helpers/utils.helper");
const { NotFound } = require("../../helpers/errors.helper");
const { Group } = require("../../models/Group.model");
const validator = require("../../helpers/validator.helper");
const validatorSchema = require("../../validators/user.validator");

module.exports = AsyncCatch(async (req, res, next) => {
    const params = validator(validatorSchema(["code"]), req.params);

    if (req.user.code !== params.code) throw new NotFound("Not found.");

    const groups = await Promise.all(
        req.user.groups.map(async (groupId) => {
            const group = await Group.findById(groupId);
            return group;
        })
    );

    res.send(groups);
});

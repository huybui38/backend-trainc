const { AsyncCatch } = require("../../helpers/utils.helper");
const { BadRequest } = require("../../helpers/errors.helper");
const { Group } = require("../../models/Group.model");

module.exports = AsyncCatch(async (req, res, next) => {
    const group = await Group.findById(req.params.id);
    if (!group) throw new BadRequest("Not found.");

    res.send(group);
});

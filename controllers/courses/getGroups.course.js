const { AsyncCatch } = require("../../helpers/utils.helper");
const { BadRequest } = require("../../helpers/errors.helper");
const { Group } = require("../../models/Group.model");
const { Course } = require("../../models/Course.model");

module.exports = AsyncCatch(async (req, res, next) => {
    const course = await Course.findById(req.params.id);
    if (!course) throw new BadRequest("Not found.");

    const groups = await Promise.all(course.groups.map((id) => Group.findById(id)));
    res.send(groups);
});

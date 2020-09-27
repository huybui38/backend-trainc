const { AsyncCatch } = require("../../helpers/utils.helper");
const { BadRequest, DefaultError } = require("../../helpers/errors.helper");
const { Group } = require("../../models/Group.model");
const { Course } = require("../../models/Course.model");
const validator = require("../../helpers/validator.helper");
const validatorSchema = require("../../validators/course.validator");

module.exports = AsyncCatch(async (req, res, next) => {
    const params = validator(validatorSchema(["id"]), req.params);

    const course = await Course.findById(params.id);
    if (!course) throw new BadRequest("Not found.");

    const groups = await Promise.all(course.groups.map((id) => Group.findById(id)));
    if (!groups) throw new DefaultError("Can't connect to database.");

    res.send(groups);
});

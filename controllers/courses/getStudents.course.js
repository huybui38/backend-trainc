const { AsyncCatch } = require("../../helpers/utils.helper");
const { BadRequest } = require("../../helpers/errors.helper");
const { Course } = require("../../models/Course.model");
const { User } = require("../../models/User.model");
const validator = require("../../helpers/validator.helper");
const validatorSchema = require("../../validators/course.validator");

module.exports = AsyncCatch(async (req, res, next) => {
    const params = validator(validatorSchema(["id"]), req.params);

    const course = await Course.findById(params.id);
    if (!course) throw new BadRequest("Not found.");

    const students = await Promise.all(course.students.map((code) => User.findOne({ code: code })));
    if (!students) throw new DefaultError("Can't connect to database.");
    res.send(students);
});

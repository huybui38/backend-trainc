const { AsyncCatch } = require("../../helpers/utils.helper");
const { NotFound } = require("../../helpers/errors.helper");
const { Course } = require("../../models/Course.model");
const validator = require("../../helpers/validator.helper");
const validatorSchema = require("../../validators/user.validator");

module.exports = AsyncCatch(async (req, res, next) => {
    const params = validator(validatorSchema(["code"]), req.params);

    if (req.user.code !== params.code) throw new NotFound("Not found.");

    const courses = await Promise.all(
        req.user.courses.map(async (courseId) => {
            const course = await Course.findById(courseId);
            return course;
        })
    );

    res.send(courses);
});

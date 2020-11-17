const { AsyncCatch } = require("../../helpers/utils.helper");
const { NotFound } = require("../../helpers/errors.helper");
const validator = require("../../helpers/validator.helper");
const validatorSchema = require("../../validators/user.validator");

module.exports = AsyncCatch(async (req, res, next) => {
    const params = validator(validatorSchema(["code"]), req.params);

    if (req.user.code !== params.code) throw new NotFound("Not found.");

    await Promise.all(
        req.user.courses.map(async (courseId) => {
            const course = await Course.findById(courseId);
            courseId = course.name;
        })
    );

    res.send(req.user.courses);
});

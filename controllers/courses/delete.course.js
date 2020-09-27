const { AsyncCatch } = require("../../helpers/utils.helper");
const { DefaultError, NotFound, Unauthorized } = require("../../helpers/errors.helper");
const { Course } = require("../../models/Course.model");
const validator = require("../../helpers/validator.helper");
const validatorSchema = require("../../validators/course.validator");

module.exports = AsyncCatch(async (req, res, next) => {
    const params = validator(validatorSchema(["id"]), req.params);

    const course = await Course.findById(params.id);
    if (!course) throw new NotFound("Not found.");

    const result = await Course.findByIdAndDelete(course._id);
    if (!result) throw new DefaultError("Can't connect to database.");

    res.send("Course was deleted successfully.");
});

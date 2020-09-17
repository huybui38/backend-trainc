const { AsyncCatch } = require("../../helpers/utils.helper");
const { DefaultError, NotFound, Unauthorized } = require("../../helpers/errors.helper");
const { Course } = require("../../models/Course.model");
const validator = require("../../helpers/validator.helper");
const validatorSchema = require("../../validators/course.validator");

const deleteCourse = AsyncCatch(async (req, res, next) => {
    const course = await Course.findOne({ name: req.params.name });
    if (!course) throw new NotFound("Not found.");

    const input = validator(validatorSchema(["name"]), req.body);
    if (input.name !== course.name) throw new Unauthorized("Name is not correct.");

    const result = await Course.findOneAndDelete({ name: input.name });
    if (!result) throw new DefaultError("Can't connect to database.");

    res.send("Course was deleted successfully.");
});

module.exports = deleteCourse;

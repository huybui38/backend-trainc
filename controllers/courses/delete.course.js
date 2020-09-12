const { AsyncCatch } = require("../../helpers/utils.helper");
const { DefaultError, NotFound } = require("../../helpers/errors.helper");
const { Course } = require("../../models/Course.model");
const validator = require("../../helpers/validator.helper");
const validatorSchema = require("../../validators/course.validator");

const deleteCourse = AsyncCatch(async (req, res, next) => {
    const course = await Course.findOne({ name: req.params.name });
    if (!course) throw new NotFound("Not found.");

    const result = await Course.findOneAndDelete({ name: course.name });
    if (!result) throw new DefaultError("Can't connect to database.");

    res.send("Delete course successful.");
});

module.exports = deleteCourse;

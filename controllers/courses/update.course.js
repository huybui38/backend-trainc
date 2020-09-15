const { AsyncCatch } = require("../../helpers/utils.helper");
const { DefaultError, NotFound } = require("../../helpers/errors.helper");
const { Course } = require("../../models/Course.model");
const validator = require("../../helpers/validator.helper");
const validatorSchema = require("../../validators/course.validator");

const updateCourse = AsyncCatch(async (req, res, next) => {
    const course = await Course.findOne({ name: req.params.name });
    if (!course) throw new NotFound("Not found.");

    const input = validator(validatorSchema(["name", "active"]), req.body);

    const result = await Course.findOneAndUpdate(
        { name: course.name },
        { $set: { name: input.name, active: input.active } }
    );
    if (!result) throw new DefaultError("Can't connect to database.");

    res.send("Update course successful.");
});

module.exports = updateCourse;

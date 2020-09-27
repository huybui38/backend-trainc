const { AsyncCatch } = require("../../helpers/utils.helper");
const { DefaultError, NotFound } = require("../../helpers/errors.helper");
const { Course } = require("../../models/Course.model");
const validator = require("../../helpers/validator.helper");
const validatorSchema = require("../../validators/course.validator");

module.exports = AsyncCatch(async (req, res, next) => {
    const params = validator(validatorSchema(["id"]), req.params);

    const course = await Course.findById(params.id);
    if (!course) throw new NotFound("Not found.");

    const input = validator(validatorSchema(["name", "active"]), req.body);

    const result = await Course.findByIdAndUpdate(course._id, { $set: { name: input.name, active: input.active } });
    if (!result) throw new DefaultError("Can't connect to database.");

    res.send("Course was updated successfully.");
});

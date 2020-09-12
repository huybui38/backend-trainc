const { AsyncCatch } = require("../../helpers/utils.helper");
const { BadRequest, DefaultError } = require("../../helpers/errors.helper");
const { Course } = require("../../models/Course.model");
const validator = require("../../helpers/validator.helper");
const validatorSchema = require("../../validators/course.validator");

const createCourse = AsyncCatch(async (req, res, next) => {
    const input = validator(validatorSchema(["name"]), req.body);
    const course = await Course.findOne({ name: input.name });
    if (course) throw new BadRequest("Name is taken.");

    const result = await Course.create(input);
    if (!result) throw new DefaultError("Can't connect to database.");

    res.send("Create course successful.");
});

module.exports = createCourse;

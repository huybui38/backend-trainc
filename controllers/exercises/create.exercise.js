const { AsyncCatch } = require("../../helpers/utils.helper");
const { BadRequest, DefaultError, Unauthorized } = require("../../helpers/errors.helper");
const { Exercise } = require("../../models/Exercise.model");
const { Course } = require("../../models/Course.model");
const { Group } = require("../../models/Group.model");
const validator = require("../../helpers/validator.helper");
const validatorSchema = require("../../validators/exercise.validator");

module.exports = AsyncCatch(async (req, res, next) => {
    const input = validator(
        validatorSchema(["code", "content", "group", "course", "active", "point", "attempt", "deadline", "testcase"]),
        req.body
    );
  
    if (await Exercise.findOne({ code: input.code })) throw new BadRequest("Code is taken.");

    const course = await Course.findOne({ name: input.course });
    if (!course) throw new Unauthorized("Course is not correct.");
    input.course = course._id;

    if (input.group) {
        if (!course.groups.includes(input.group)) throw new Unauthorized("Group is not correct.");
        input.type = true;
    }

    const exercise = await Exercise.create(input);
    if (!exercise) throw new DefaultError("Can't connect to database.");

    if (input.type) {
        const upGroup = await Group.findByIdAndUpdate(exercise.group, { $push: { exercises: exercise._id } });
        if (!upGroup) throw new DefaultError("Can't connect to database.");
    }

    const upCourse = await Course.findByIdAndUpdate(exercise.course, { $push: { exercises: exercise._id } });
    if (!upCourse) throw new DefaultError("Can't connect to database.");

    res.send("Exercise was created successfully.");
});

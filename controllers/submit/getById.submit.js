const { AsyncCatch } = require("../../helpers/utils.helper");
const { NotFound } = require("../../helpers/errors.helper");
const { Submit } = require("../../models/Submit.model");
const { Course } = require("../../models/Course.model");
const { Exercise } = require("../../models/Exercise.model");
const validator = require("../../helpers/validator.helper");
const validatorSchema = require("../../validators/submit.validator");

module.exports = AsyncCatch(async (req, res, next) => {
    const params = validator(validatorSchema(["id"]), req.params);

    const submit = await Submit.findById(params.id);
    if (!submit) throw new NotFound("Not found.");

    const course = await Course.findById(submit.course);
    if (!course) throw new NotFound("Not found.");
    submit.course = course.name;

    const exercise = await Exercise.findById(submit.code);
    if (!exercise) throw new NotFound("Not found.");
    const exerciseInfo = {
        code: exercise.code,
        _id: exercise._id,
        point: exercise.point
    };
    submit.exercise = exerciseInfo;

    res.send(submit);
});

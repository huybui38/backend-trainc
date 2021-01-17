const { AsyncCatch } = require("../../helpers/utils.helper");
const { NotFound, DefaultError, Forbidden } = require("../../helpers/errors.helper");
const { Submit } = require("../../models/Submit.model");
const { User } = require("../../models/User.model");
const { Course } = require("../../models/Course.model");
const { Exercise } = require("../../models/Exercise.model.model");
const validator = require("../../helpers/validator.helper");
const validatorSchema = require("../../validators/user.validator");

module.exports = AsyncCatch(async (req, res, next) => {
    const params = validator(validatorSchema(["code"]), req.params);
    const user = await User.findOne({ code: params.code });
    if (!user) throw new NotFound("Not found.");

    if (user.code !== req.user.code) throw new Forbidden("Forbidden");

    const submits = await Promise.all(
        req.user.exercises.map(async (exercise) => {
            return await Submit.findById(exercise.submit);
        })
    );

    await Promise.all(
        submits.map(async (submit) => {
            const course = await Course.findById(submit.course);
            submit.course = course.name;

            const exercise = await Exercise.findById(submit.code);
            submit.exercise = exercise;
        })
    );

    res.send(submits);
});

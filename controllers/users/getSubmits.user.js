const { AsyncCatch } = require("../../helpers/utils.helper");
const { NotFound, DefaultError, Forbidden } = require("../../helpers/errors.helper");
const { Submit } = require("../../models/Submit.model");
const { User } = require("../../models/User.model");
const { Course } = require("../../models/Course.model");
const { Exercise } = require("../../models/Exercise.model");
const validator = require("../../helpers/validator.helper");
const validatorSchema = require("../../validators/user.validator");
const { submit } = require("../../helpers/upload.helper");
const _ = require("lodash");

module.exports = AsyncCatch(async (req, res, next) => {
    const params = validator(validatorSchema(["code"]), req.params);
    const user = await User.findOne({ code: params.code });
    if (!user) throw new NotFound("Not found.");

    let submits = await Promise.all(
        user.exercises.map(async (exercise) => {
            return await Submit.findById(exercise.submit);
        })
    );

    await Promise.all(
        submits.map(async (submit) => {
            const course = await Course.findById(submit.course);
            submit.course = course.name;

            const exercise = await Exercise.findById(submit.code);
            const exerciseInfo = {
                code: exercise.code,
                _id: exercise._id,
                point: exercise.point
            };
            submit.exercise = exerciseInfo;
        })
    );
    let check = 1;
    if ((req.user.role === "0") && (req.user.code !== params.code)) check = 0;

    if (!check) {
        submits = submits.map((submit) => {
            for (item of submit.locations) {
                delete item.location;
                delete item.mentors;
            }
            return submit;
        });
    }
    res.send(submits);
});

const { BadRequest, Forbidden, NotFound } = require("../helpers/errors.helper");
const { AsyncCatch } = require("../helpers/utils.helper");
const { submit } = require("../helpers/upload.helper");
const { Exercise } = require("../models/Exercise.model");
const { Submit } = require("../models/Submit.model");
const { User } = require("../models/User.model");
const validator = require("../helpers/validator.helper");
const validatorSchema = require("../validators/exercise.validator");

module.exports = AsyncCatch(async (req, res, next) => {
    const params = validator(validatorSchema(["id"]), req.params);

    const exercise = await Exercise.findById(params.id);
    if (!exercise) throw new NotFound("Not found.");

    if (exercise.type) {
        if (!req.user.groups.includes(exercise.group)) throw new Forbidden("Forbidden.");
    } else if (!req.user.courses.includes(exercise.course)) throw new Forbidden("Forbidden.");

    if (exercise.submits.includes(req.user.code)) {
        for (const item of req.user.exercises) {
            if (item.exercise.equals(exercise._id)) {
                req.submit = await Submit.findById(item.submit);
            }
        }
    } else {
        req.submit = await Submit.create({
            code: exercise._id,
            user: req.user.code,
            course: exercise.course,
            attempt: 0,
            maxAttempt: excercise.attempt,
        });

        await Exercise.findByIdAndUpdate(exercise._id, { $push: { submits: req.user.code } });
        const submitInfo = {
            exercise: exercise._id,
            submit: req.submit._id,
        };
        await User.findByIdAndUpdate(req.user._id, { $push: { exercises: submitInfo } });
    }

    if (req.submit.attempt === exercise.attempt) throw new BadRequest("Not allow to upload.");

    submit(req, res, (err) => {
        if (err) {
            res.status(400).send(err.message);
        } else {
            if (req.file === undefined) {
                res.status(400).send("No file.");
            } else {
                next();
            }
        }
    });
});

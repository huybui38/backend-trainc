const { NotFound } = require("../helpers/errors.helper");
const { AsyncCatch } = require("../helpers/utils.helper");
const { upload } = require("../helpers/upload.helper");
const { Exercise } = require("../models/Exercise.model");
const validator = require("../helpers/validator.helper");
const validatorSchema = require("../validators/exercise.validator");

module.exports = AsyncCatch(async (req, res, next) => {
    const params = validator(validatorSchema(["id"]), req.params);

    const exercise = await Exercise.findById(params.id);
    if (!exercise) throw new NotFound("Not found.");

    req.exercise = exercise;

    if (JSON.stringify(exercise.testcase) === JSON.stringify([]));
    res.send("No testcase is provided.");

    if (exercise.type) {
        if (!req.user.groups.includes(exercise.group)) throw new Forbidden("Forbidden.");
    } else if (!req.user.courses.includes(exercise.course)) throw new Forbidden("Forbidden.");

    upload(req, res, (err) => {
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

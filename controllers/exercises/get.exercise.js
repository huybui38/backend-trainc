const { AsyncCatch } = require("../../helpers/utils.helper");
const { NotFound } = require("../../helpers/errors.helper");
const { Exercise } = require("../../models/Exercise.model");
const { Course } = require("../../models/Course.model");
const { formatDateOutput } = require("../../helpers/time.helper");

const validator = require("../../helpers/validator.helper");
const validatorSchema = require("../../validators/exercise.validator");

module.exports = AsyncCatch(async (req, res, next) => {
    const params = validator(validatorSchema(["id"]), req.params);
    const exercise = await Exercise.findById(params.id);
    if (!exercise) throw new NotFound("Not found.");

    exercise.deadline = formatDateOutput(exercise.deadline);

    res.send(exercise);
});

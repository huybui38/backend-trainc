const { AsyncCatch } = require("../../helpers/utils.helper");
const { NotFound } = require("../../helpers/errors.helper");
const { Exercise } = require("../../models/Exercise.model");
const validator = require("../../helpers/validator.helper");
const validatorSchema = require("../../validators/exercise.validator");

module.exports = AsyncCatch(async (req, res, next) => {
    const exercise = await Exercise.findOne({ code: req.params.code });
    if (!exercise) throw new NotFound("Not found.");

    res.send(exercise);
});

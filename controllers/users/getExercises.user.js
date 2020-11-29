const { AsyncCatch } = require("../../helpers/utils.helper");
const { NotFound } = require("../../helpers/errors.helper");
const { Exercise } = require("../../models/Exercise.model");
const validator = require("../../helpers/validator.helper");
const validatorSchema = require("../../validators/exercise.validator");

module.exports = AsyncCatch(async (req, res, next) => {
    const params = validator(validatorSchema(["code"]), req.params);
    const query = validator(validatorSchema(["type"]), req.query);
    if (req.user.code !== params.code) throw new NotFound("Not found.");

    const exercises = await Promise.all(
        req.user.courses.map(async (courseId) => {
            const exercise = await Exercise.find({ course: courseId, active: true, type: query.type });
            return exercise;
        })
    );
    res.send(exercises);
});

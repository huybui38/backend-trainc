const { AsyncCatch } = require("../../helpers/utils.helper");
const { BadRequest, DefaultError, NotFound } = require("../../helpers/errors.helper");
const { Exercise } = require("../../models/Exercise.model");
const validator = require("../../helpers/validator.helper");
const validatorSchema = require("../../validators/exercise.validator");

module.exports = AsyncCatch(async (req, res, next) => {
    const params = validator(validatorSchema(["id"]), req.params);

    const exercise = await Exercise.findById(params.id);
    if (!exercise) throw new NotFound("Not found.");

    const input = validator(validatorSchema(["content", "point", "attempt", "deadline", "testcase"]), req.body);

    const result = await Exercise.findByIdAndUpdate(exercise._id, {
        content: input.content,
        point: input.point,
        attempt: input.attempt,
        deadline: input.deadline,
        testcase: input.testcase,
    });
    if (!result) throw new DefaultError("Can't connect to database.");

    res.send("Exercise was updated successfully.");
});

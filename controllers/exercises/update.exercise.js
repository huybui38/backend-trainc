const { AsyncCatch } = require("../../helpers/utils.helper");
const { BadRequest, DefaultError, NotFound } = require("../../helpers/errors.helper");
const { Exercise } = require("../../models/Exercise.model");
const { formatDate } = require("../../helpers/time.helper");
const validator = require("../../helpers/validator.helper");
const validatorSchema = require("../../validators/exercise.validator");

module.exports = AsyncCatch(async (req, res, next) => {
    const exercise = await Exercise.findOne({ code: req.params.code });
    if (!exercise) throw new NotFound("Not found.");

    const input = validator(validatorSchema(["code", "content", "active", "point", "attempt", "deadline"]), req.body);

    if (await Exercise.findOne({ code: input.code })) throw new BadRequest("Code is taken.");

    input.deadline = formatDate(input.deadline);

    const result = await Exercise.findByIdAndUpdate(exercise._id, {
        code: input.code,
        content: input.content,
        active: input.active,
        point: input.point,
        attempt: input.attempt,
        deadline: input.deadline,
    });
    if (!result) throw new DefaultError("Can't connect to database.");

    res.send("Exercise was updated successfully.");
});

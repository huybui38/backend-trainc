const { AsyncCatch } = require("../../helpers/utils.helper");
const { BadRequest, DefaultError, NotFound } = require("../../helpers/errors.helper");
const { Submit } = require("../../models/Submit.model");
const { User } = require("../../models/User.model");
const { Exercise } = require("../../models/Exercise.model");
const validator = require("../../helpers/validator.helper");
const validatorSchema = require("../../validators/submit.validator");
const { ExerciseStatusEnum } = require("../../helpers/exerciseEnum.helper");
const { formatDateOutput } = require("../../helpers/time.helper");

module.exports = AsyncCatch(async (req, res, next) => {
    const params = validator(validatorSchema(["id"]), req.params);

    const submit = await Submit.findById(params.id);
    if (!submit) throw new NotFound("Not found.");

    const input = validator(validatorSchema(["status", "comment", "time"]), req.body);
    if (input.time <= 0 || input.time > submit.attempt) throw new BadRequest("Time is invalid.");

    const location = submit.locations[input.time];
    if (!location) throw new BadRequest("Location is not provided.");

    if (loaction.status === input.status) throw new BadRequest("Status is not changed.");

    const user = await User.findOne({ code: submit.user });
    const exercise = await Exercise.findById(submit.code);

    for (const pointInfo of user.point) {
        if (pointInfo.courseId.equals(exercise.course)) {
            if (location.status === ExerciseStatusEnum.SUCCESS) {
                pointtInfor.point -= exercise.point;
            } else if (input.status === ExerciseStatusEnum.SUCCESS) {
                pointtInfor.point += exercise.point;
            }
        }
    }

    if (submit.attempt === submit.maxAttempt && input.status === ExerciseStatusEnum.FAILED)
        location.status = ExerciseStatusEnum.REJECT;
    else location.status = input.status;
    location.mentors.push({
        mentor: req.user.name,
        comment: input.comment,
        time: formatDateOutput(Date.now()),
    });

    submit.locations[input.time] = location;

    await User.findByIdAndUpdate(user._id, { point: user.point });
    await Submit.findByIdAndUpdate(submit._id, { locations: submit.locations });

    res.send("Exercise was updated successfully.");
});

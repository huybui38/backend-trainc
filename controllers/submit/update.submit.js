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

    const input = validator(validatorSchema(["status", "comment", "location"]), req.body);

    if (submit.status === input.status) throw new BadRequest("Status is not changed.");

    const user = await User.findOne({ code: submit.user });
    const exercise = await Exercise.findById(submit.code);

    for (const pointInfo of user.point) {
        if (pointInfo.courseId.equals(exercise.course)) {
            if (submit.status === ExerciseStatusEnum.SUCCESS) {
                pointtInfor.point -= exercise.point;
            } else if (input.submit === ExerciseStatusEnum.SUCCESS) {
                pointtInfor.point += exercise.point;
            }
        }
    }

    let check = false;
    for (const locationInfo of submit.locations) {
        console.log(locationInfo.location);
        console.log(input.location);
        if (locationInfo.location === input.location) {
            if (submit.locations.length === submit.attempt && input.status === ExerciseStatusEnum.FAILED)
                locationInfo.status = ExerciseStatusEnum.REJECT;
            else locationInfo.status = input.status;
            locationInfo.mentors.push({
                mentor: req.user.name,
                comment: input.comment,
                time: formatDateOutput(Date.now()),
            });
            check = true;
        }
    }
    if (!check) throw new BadRequest("Location is not correct.");

    await User.findByIdAndUpdate(user._id, { point: user.point });
    await Submit.findByIdAndUpdate(submit._id, { locations: submit.locations });

    res.send("Exercise was updated successfully.");
});

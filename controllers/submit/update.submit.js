const { AsyncCatch } = require("../../helpers/utils.helper");
const { BadRequest, DefaultError, NotFound } = require("../../helpers/errors.helper");
const { Submit } = require("../../models/Submit.model");
const { User } = require("../../models/User.model");
const { Exercise } = require("../../models/Exercise.model");
const validator = require("../../helpers/validator.helper");
const validatorSchema = require("../../validators/submit.validator");
const { ExerciseStatusEnum } = require("../../helpers/exerciseEnum.helper");

module.exports = AsyncCatch(async (req, res, next) => {
    const params = validator(validatorSchema(["id"]), req.params);

    const submit = await Submit.findById(params.id);
    if (!submit) throw new NotFound("Not found.");

    const input = validator(validatorSchema(["status", "comment", "location"]), req.body);

    if (submit.status == input.status) throw new BadRequest("Status is not changed.");

    const user = await User.findOne({ code: submit.user });
    const exercise = await Exercise.findById(submit.code);

    for (const pointInfo of user.point) {
        if (pointInfo.course.equals(exercise.course)) {
            if (submit.status === ExerciseStatusEnum.SUCCESS) {
                pointtInfor.point -= exercise.point;
            } else if (input.submit === ExerciseStatusEnum.SUCCESS) {
                pointtInfor.point += exercise.point;
            }
        }
    }
    await User.findByIdAndUpdate(user._id, { point: user.point });

    var check = false;
    for (const locationInfo of submit.locations) {
        if (locationInfo.location.equals(input.location)) {
            locationInfo.location.status = input.status;
            locationInfo.location.comment = input.comment;
            check = true;
        }
    }
    if (!check) throw new BadRequest("Location is not correct.");
    await Submit.findByIdAndUpdate(submit._id, { locations: submit.locaitons });

    res.send("Exercise was updated successfully.");
});

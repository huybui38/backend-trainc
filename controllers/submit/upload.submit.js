const { AsyncCatch } = require("../../helpers/utils.helper");
const { BadRequest, DefaultError } = require("../../helpers/errors.helper");
const { Submit } = require("../../models/Submit.model");
const { formatDateOutput } = require("../../helpers/time.helper");
const { ExerciseStatusEnum } = require("../../helpers/exerciseEnum.helper");

module.exports = AsyncCatch(async (req, res, next) => {
    const locationInfo = {
        location: req.file.path,
        timeSubmit: formatDateOutput(Date.now()),
        status: ExerciseStatusEnum.PROCESS,
        mentors: [],
    };
    const submit = await Submit.findByIdAndUpdate(req.submit._id, {
        $push: { locations: locationInfo },
        attempt: req.submit.attempt + 1,
    });
    res.send("Upload file success.");
});

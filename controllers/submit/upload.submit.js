const { AsyncCatch } = require("../../helpers/utils.helper");
const { BadRequest, DefaultError } = require("../../helpers/errors.helper");
const { Submit } = require("../../models/Submit.model");
const { formatDateOutput } = require("../../helpers/time.helper");

module.exports = AsyncCatch(async (req, res, next) => {
    const locationInfo = {
        location: req.file.location,
        timeSubmit: formatDateOutput(Date.now()),
        status: "1",
        comment: "",
    };
    const submit = await Submit.findByIdAndUpdate(req.submit._id, { $push: { locations: locationInfo } });
    res.send("Upload file success.");
});

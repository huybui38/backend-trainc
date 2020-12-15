const { AsyncCatch } = require("../../helpers/utils.helper");
const { NotFound, DefaultError } = require("../../helpers/errors.helper");
const { Course } = require("../../models/Course.model");
const { Submit } = require("../../models/Submit.model");
const validator = require("../../helpers/validator.helper");
const validatorSchema = require("../../validators/group.validator");

module.exports = AsyncCatch(async (req, res, next) => {
    const submits = await Submit.find({});
    await Promise.all(
        submits.map(async (submit) => {
            const course = await Course.findById(submit.course);
            submit.course = course.name;
        })
    );

    res.send(submits);
});

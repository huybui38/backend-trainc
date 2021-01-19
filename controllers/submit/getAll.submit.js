const { AsyncCatch } = require("../../helpers/utils.helper");
const { NotFound, DefaultError } = require("../../helpers/errors.helper");
const { Course } = require("../../models/Course.model");
const { Submit } = require("../../models/Submit.model");
const validator = require("../../helpers/validator.helper");
const validatorSchema = require("../../validators/group.validator");
const { Exercise } = require("../../models/Exercise.model");

module.exports = AsyncCatch(async (req, res, next) => {
    const submits = await Submit.find({});

    const submitsFilter = await Promise.all(
        submits.filter((submit) => {
					return submit.locations[submit.attempt - 1].status === "1";
        })
    );
    
    await Promise.all(
        submitsFilter.map(async (submit) => {
            const course = await Course.findById(submit.course);
            submit.course = course.name;

            const exercise = await Exercise.findById(submit.code);
            const exerciseInfo = {
              code: exercise.code,
              _id: exercise._id,
              point: exercise.point
          };
            submit.exercise = exerciseInfo;
        })
    );

    res.send(submitsFilter);
});

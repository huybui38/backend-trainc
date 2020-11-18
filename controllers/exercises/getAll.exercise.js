const { AsyncCatch } = require("../../helpers/utils.helper");
const { DefaultError, BadRequest } = require("../../helpers/errors.helper");
const { Exercise } = require("../../models/Exercise.model");
const { Course } = require("../../models/Course.model");
const { Group } = require("../../models/Group.model");
const validator = require("../../helpers/validator.helper");
const validatorSchema = require("../../validators/exercise.validator");

module.exports = AsyncCatch(async (req, res, next) => {
    const query = validator(validatorSchema(["type"]), req.query);
    const exercises = await Exercise.find({ type: query.type });
    if (!exercises) throw new BadRequest("Don't have any course of this type.");

    await Promise.all(
        exercises.map(async (exercise) => {
            if (exercise.type === false) {
                console.log(exercise);
                const course = await Course.findById(exercise.course);
                if (!course) throw new BadRequest("Course " + exercise.course + " does not exist.");
                exercise.course = course.name;
            } else {
                const course = await Course.findById(exercise.course);
                if (!course) throw new BadRequest("Course " + exercise.course + " does not exist.");
                const group = await Group.findById(exercise.group);
                if (!group) throw new BadRequest("Group " + exercise.group + " does not exist.");
                exercise.group = group.name;
                exercise.course = course.name;
            }
        })
    );
    res.send(exercises);
});

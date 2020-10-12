const { AsyncCatch } = require("../../helpers/utils.helper");
const { DefaultError } = require("../../helpers/errors.helper");
const { Exercise } = require("../../models/Exercise.model");
const { Course } = require("../../models/Course.model");
const { Group } = require("../../models/Group.model");

module.exports = AsyncCatch(async (req, res, next) => {
    const exercises = await Exercise.find();
    if (!exercises) throw new DefaultError("Can't connect to database.");

    await Promise.all(
        exercises.map(async (exercise) => {
            const course = await Course.findById(exercise.course);
            if (!course) throw new DefaultError("Can't connect to database.");
            exercise.course = course.name;

            const group = await Group.findById(exercise.group);
            if (!group) throw new DefaultError("Can't connect to database.");
            exercise.group = group.name;
        })
    );

    res.send(exercises);
});

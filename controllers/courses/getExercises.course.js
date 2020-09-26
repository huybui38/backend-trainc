const { AsyncCatch } = require("../../helpers/utils.helper");
const { BadRequest } = require("../../helpers/errors.helper");
const { Course } = require("../../models/Course.model");
const { Exercise } = require("../../models/Exercise.model");

module.exports = AsyncCatch(async (req, res, next) => {
    const course = await Course.findById(req.params.id);
    if (!course) throw new BadRequest("Not found.");

    const exercises = await Promise.all(course.exercises.map((id) => Exercise.findById(id)));
    if (!exercises) throw new DefaultError("Can't connect to database.");
    res.send(exercises);
});

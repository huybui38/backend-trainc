const { AsyncCatch } = require("../../helpers/utils.helper");
const { DefaultError } = require("../../helpers/errors.helper");
const { Course } = require("../../models/Course.model");

module.exports = AsyncCatch(async (req, res, next) => {
    const courses = await Course.find({}, ["name", "active", "_id", "createdTime", "thumbnail"]).sort({ name: 1 });
    if (!courses) throw new DefaultError("Can't connect to database.");
    res.send(courses);
});

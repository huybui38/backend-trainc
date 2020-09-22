const { AsyncCatch } = require("../../helpers/utils.helper");
const { BadRequest } = require("../../helpers/errors.helper");
const { Notification } = require("../../models/Notification.model");
const { Course } = require("../../models/Course.model");

module.exports = AsyncCatch(async (req, res, next) => {
    const course = await Course.findById(req.params.id);
    if (!course) throw new BadRequest("Not found.");

    const notifications = await Promise.all(course.notifications.map((id) => Notification.findById(id)));
    res.send(notifications);
});

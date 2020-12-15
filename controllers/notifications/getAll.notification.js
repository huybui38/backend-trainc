const { AsyncCatch } = require("../../helpers/utils.helper");
const { DefaultError } = require("../../helpers/errors.helper");
const { Notification } = require("../../models/Notification.model");
const { Course } = require("../../models/Course.model");

module.exports = AsyncCatch(async (req, res, next) => {
    const notifications = await Notification.find();
    if (!notifications) throw new DefaultError("Can't connect to database.");

    await Promise.all(
        notifications.map(async (notification) => {
            const course = await Course.findById(notification.course);
            if (!course) throw new DefaultError("Can't connect to database.");

            notification.course = course.name;
        })
    )

    res.send(notifications);
});

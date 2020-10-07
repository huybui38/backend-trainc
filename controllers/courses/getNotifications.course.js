const { AsyncCatch } = require("../../helpers/utils.helper");
const { BadRequest } = require("../../helpers/errors.helper");
const { Notification } = require("../../models/Notification.model");
const { Course } = require("../../models/Course.model");
const validator = require("../../helpers/validator.helper");
const validatorSchema = require("../../validators/course.validator");

module.exports = AsyncCatch(async (req, res, next) => {
    const params = validator(validatorSchema(["id"]), req.params);

    const course = await Course.findById(params.id);
    if (!course) throw new BadRequest("Not found.");

    const notifications = await Promise.all(course.notifications.map((id) => Notification.findById(id)));
    if (!notifications) throw new DefaultError("Can't connect to database.");

    for (let notification of notifications) {
        notification.course = course.name;
    }

    res.send(notifications);
});

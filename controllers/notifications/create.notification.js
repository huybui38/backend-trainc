const { AsyncCatch } = require("../../helpers/utils.helper");
const { DefaultError, Unauthorized } = require("../../helpers/errors.helper");
const { Course } = require("../../models/Course.model");
const { Notification } = require("../../models/Notification.model");
const validator = require("../../helpers/validator.helper");
const validatorSchema = require("../../validators/notification.validator");

module.exports = AsyncCatch(async (req, res, next) => {
    const input = validator(validatorSchema(["content", "course"]), req.body);

    const course = await Course.findOne({ name: input.course });
    if (!course) throw new Unauthorized("Course is not correct.");

    input.course = course._id;

    const notification = await Notification.create(input);
    if (!notification) throw new DefaultError("Can't connect to database.");

    const result = await Course.findOneAndUpdate({ _id: course._id }, { $push: { notifications: notification._id } });
    if (!result) throw new DefaultError("Can't connect to database.");

    res.send(notification);
});

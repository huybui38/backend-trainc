const { AsyncCatch } = require("../../helpers/utils.helper");
const { DefaultError, Unauthorized, BadRequest } = require("../../helpers/errors.helper");
const { Course } = require("../../models/Course.model");
const { Notification } = require("../../models/Notification.model");
const validator = require("../../helpers/validator.helper");
const validatorSchema = require("../../validators/notification.validator");

module.exports = AsyncCatch(async (req, res, next) => {
    const params = validator(validatorSchema(["id"]), req.params);

    const notification = await Notification.findById(params.id);
    if (!notification) throw new BadRequest("Not found.");

    const course = await Course.findByIdAndUpdate(notification.course, { $pull: { notifications: notification._id } });
    if (!course) throw new DefaultError("Can't connect to database.");

    const result = await Notification.findByIdAndDelete(notification._id);
    if (!result) throw new DefaultError("Can't connect to database.");

    res.send("Notification was deleted successfully.");
});

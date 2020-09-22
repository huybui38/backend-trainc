const { AsyncCatch } = require("../../helpers/utils.helper");
const { DefaultError, Unauthorized, BadRequest } = require("../../helpers/errors.helper");
const { Course } = require("../../models/Course.model");
const { Notification } = require("../../models/Notification.model");
const validator = require("../../helpers/validator.helper");
const validatorSchema = require("../../validators/notification.validator");

module.exports = AsyncCatch(async (req, res, next) => {
    const notification = await Notification.findById(req.params.id);
    if (!notification) throw new BadRequest("Not found.");

    const input = validator(validatorSchema(["content", "course"]), req.body);

    const course = await Course.findOne({ name: input.course });
    if (!course) throw new Unauthorized("Course is not correct.");

    const result = await Notification.findByIdAndUpdate(notification._id, {
        $set: { content: input.content, course: input.course },
    });

    if (!result) throw new DefaultError("Can't connect to database.");

    res.send("Notification was updated successfully.");
});

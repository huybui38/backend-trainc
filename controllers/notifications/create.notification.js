const { AsyncCatch } = require("../../helpers/utils.helper");
const { DefaultError, Unauthorized } = require("../../helpers/errors.helper");
const { Course } = require("../../models/Course.model");
const { Notification } = require("../../models/Notification.model");
const validator = require("../../helpers/validator.helper");
const validatorSchema = require("../../validators/notification.validator");

const createNotification = AsyncCatch(async (req, res, next) => {
    const input = validator(validatorSchema(["content", "course"]), req.body);

    const course = await Course.findOne({ name: input.course });
    if (!course) throw new Unauthorized("Course is not correct.");

    const result = await Notification.create(input);
    if (!result) throw new DefaultError("Can't connect to database.");

    res.send("Notification was created successfully.");
});

module.exports = createNotification;

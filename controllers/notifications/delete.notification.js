const { AsyncCatch } = require("../../helpers/utils.helper");
const { DefaultError, Unauthorized, BadRequest } = require("../../helpers/errors.helper");
const { Course } = require("../../models/Course.model");
const { Notification } = require("../../models/Notification.model");

module.exports = AsyncCatch(async (req, res, next) => {
    const notification = await Notification.findById(req.params.id);
    if (!notification) throw new BadRequest("Not found.");

    const result = await Notification.findByIdAndDelete(notification._id);

    if (!result) throw new DefaultError("Can't connect to database.");

    res.send("Notification was deleted successfully.");
});

const mongoose = require("mongoose");
const { formatDateOutput } = require("../helpers/time.helper");

const NotificationSchema = new mongoose.Schema({
    content: {
        type: String,
    },
    course: {
        type: String,
    },
    createdTime: {
        type: Date,
        default: Date.now(),
    },
});

module.exports.Notification = mongoose.model("Notification", NotificationSchema);

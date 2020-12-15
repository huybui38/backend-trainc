const mongoose = require("mongoose");

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

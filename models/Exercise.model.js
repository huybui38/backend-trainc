const mongoose = require("mongoose");

module.exports.Exercise = mongoose.model(
    "Exercise",
    new mongoose.Schema({
        code: {
            type: String,
        },
        detail: {
            type: String,
        },
        group: {
            type: String,
        },
        course: {
            type: String,
        },
        point: {
            type: Number,
        },
        active: {
            type: Boolean,
            default: false,
        },
        createdTime: {
            type: Date,
            default: Date.now(),
        },
        type: {
            type: Boolean,
        },
    })
);

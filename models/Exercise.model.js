const mongoose = require("mongoose");

module.exports.Exercise = mongoose.model(
    "Exercise",
    new mongoose.Schema({
        code: {
            type: String,
        },
        content: {
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
        attempt: {
            type: Number,
        },
        createdTime: {
            type: Date,
            default: Date.now(),
        },
        active: {
            type: Boolean,
            default: false,
        },
        deadline: {
            type: Date,
        },
        type: {
            type: Boolean,
            default: false, //false la bai tap chung
        },
        submits: {
            type: Array,
            default: [],
        },
    })
);

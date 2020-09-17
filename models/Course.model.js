const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    active: {
        type: Boolean,
        default: true,
    },
    createdTime: {
        type: Date,
        default: Date.now(),
    },
    groups: {
        type: Array,
        default: [],
    },
    exercises: {
        type: Array,
        default: [],
    },
});

module.exports.Course = mongoose.model("Course", CourseSchema);

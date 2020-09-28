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
    thumbnail: {
        type: String,
    },
    groups: {
        type: Array,
        default: [],
    },
    exercises: {
        type: Array,
        default: [],
    },
    notifications: {
        type: Array,
        default: [],
    },
    students: {
        type: Array,
        default: [],
    },
});

module.exports.Course = mongoose.model("Course", CourseSchema);

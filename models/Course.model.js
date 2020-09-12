const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    active: {
        type: Boolean,
        default: true,
    },
    listClass: {
        type: Array,
        default: [],
    },
    listExercise: {
        type: Array,
        default: [],
    },
});

module.exports.Course = mongoose.model("Course", CourseSchema);

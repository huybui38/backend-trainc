const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    code: {
        type: String,
    },
    password: {
        type: String,
    },
    name: {
        type: String,
    },
    active: {
        type: Boolean,
        default: true,
    },
    point: {
        type: Number,
        default: 0,
    },
    role: {
        type: String,
    },
    listCourse: {
        type: Array,
        default: [],
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

module.exports.User = mongoose.model("User", UserSchema);

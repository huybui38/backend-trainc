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
        type: Array,
        default: [],
    },
    role: {
        type: String,
    },
    courses: {
        type: Array,
        default: [],
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

module.exports.User = mongoose.model("User", UserSchema);

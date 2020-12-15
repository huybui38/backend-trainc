const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    password: {
        type: String,
    },
    course: {
        type: String,
    },
    members: {
        type: Array,
        default: [],
    },
    exercises: {
        type: Array,
        default: [],
    },
    active: {
        type: Boolean,
        default: true,
    },
});

module.exports.Group = mongoose.model("Group", GroupSchema);

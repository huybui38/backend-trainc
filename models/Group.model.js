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
});

module.exports.Group = mongoose.model("Group", GroupSchema);

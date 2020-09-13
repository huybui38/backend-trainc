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
    listStudent: {
        type: Array,
        default: [],
    },
    listMentor: {
        type: Array,
        default: [],
    },
    listExercise: {
        type: Array,
        default: [],
    },
});

module.exports.Group = mongoose.model("Group", GroupSchema);

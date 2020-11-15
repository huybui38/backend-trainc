const mongoose = require("mongoose");

const SubmitSchema = new mongoose.Schema({
    code: {
        type: String,
    },
    locations: {
        type: Array,
        default: [],
    },
    user: {
        type: String,
    },
    course: {
        type: String,
    },
    point: {
        type: Number,
        default: 0,
    },
});

module.exports.Submit = mongoose.model("Submit", SubmitSchema);

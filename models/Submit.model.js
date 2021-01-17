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
    attempt: {
        type: Number,
    },
    maxAttempt: {
        type: Number,
    },
    exercise: {
        type: Object,
    },
});

module.exports.Submit = mongoose.model("Submit", SubmitSchema);

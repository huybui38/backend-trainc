const mongoose = require("mongoose");

const SubmitSchema = new mongoose.Schema({
    code: {
        type: String,
    },
    user: {
        type: String,
    },
    course: {
        type: String,
    },
    status: {
        type: String,
    },
    point: {
        type: Number,
    },
    comment: {
        type: String,
    },
});

module.exports.Submit = mongoose.model("Submit", SubmitSchema);

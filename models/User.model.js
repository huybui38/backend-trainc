const mongoose = require("mongoose");

const UserEnumRole = {
    ADMIN: "2",
    MENTOR: "1",
    STUDENT: "0",
};

const UserSchema = new mongoose.Schema({
    mssv: {
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

// Virtual for user's full name
UserSchema.virtual("fullName").get(function () {
    return this.firstName + " " + this.lastName;
});

module.exports = mongoose.model("User", UserSchema);

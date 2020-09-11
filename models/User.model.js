const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");
const { hashingString, compareHashingString } = require("../helpers/bcrypt.helper");
const { User } = require("../../backend-trainc/models/user.model");

const UserRoleEnum = {
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
// UserSchema.virtual("fullName").get(function () {
//     return this.firstName + " " + this.lastName;
// });
UserSchema.statics.getUserToken = function ({ _id, role, mssv }) {
    return jwt.sign({ _id, role, mssv }, process.env.JWT_SECRET_KEY);
};

UserSchema.statics.validatorSchema = function (fields = []) {
    const getSchema = (field) => {
        switch (field) {
            case "mssv":
                return Joi.string().min(8).alphanum().trim().lowercase().max(8).required();
            case "password":
                return Joi.string()
                    .min(5)
                    .max(255)
                    .trim()
                    .regex(/^[a-zA-Z0-9]/)
                    .required();
            case "name":
                return Joi.string()
                    .min(3)
                    .max(255)
                    .regex(/^[a-zA-Z ]/)
                    .trim()
                    .lowercase()
                    .required();
            case "role":
                return Joi.string().valid(UserRoleEnum.MENTOR, UserRoleEnum.STUDENT).required();
            case "point":
                return Joi.string()
                    .regex(/^[0-9]/)
                    .trim()
                    .required();
            case "active":
                return Joi.boolean().required();
        }
    };

    const schema = {};

    for (let item of fields) {
        schema[`${item}`] = getSchema(item);
    }

    return schema;
};

module.exports.User = mongoose.model("User", UserSchema);

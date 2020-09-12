const Joi = require("@hapi/joi");

const UserRoleEnum = {
    ADMIN: "2",
    MENTOR: "1",
    STUDENT: "0",
};

module.exports = function (fields = []) {
    const getSchema = (field) => {
        switch (field) {
            case "code":
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
                    .min(1)
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
            case "newPassword":
                return Joi.string()
                    .min(5)
                    .max(255)
                    .trim()
                    .regex(/^[a-zA-Z0-9]/)
                    .required();
            case "confirm":
                return Joi.string()
                    .min(5)
                    .max(255)
                    .trim()
                    .regex(/^[a-zA-Z0-9]/)
                    .required()
                    .valid(Joi.ref("newPassword"));
        }
    };

    const schema = {};

    for (let item of fields) {
        schema[`${item}`] = getSchema(item);
    }

    return schema;
};

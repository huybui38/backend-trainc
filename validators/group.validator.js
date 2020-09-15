const Joi = require("@hapi/joi");

module.exports = function (fields = []) {
    const getSchema = (field) => {
        switch (field) {
            case "name":
                return Joi.string()
                    .min(1)
                    .max(255)
                    .trim()
                    .lowercase()
                    .regex(/^[a-zA-Z ]/)
                    .required();
            case "password":
                return Joi.string()
                    .min(5)
                    .max(255)
                    .regex(/^[a-zA-Z0-9]/)
                    .required();
            case "course":
                return Joi.string()
                    .min(1)
                    .max(255)
                    .trim()
                    .lowercase()
                    .regex(/^[a-zA-Z ]/)
                    .required();
            case "mentors":
                return Joi.array()
                    .items(Joi.string().min(8).alphanum().trim().lowercase().max(8).required())
                    .required();
        }
    };

    const schema = {};

    for (let item of fields) {
        schema[`${item}`] = getSchema(item);
    }

    return schema;
};

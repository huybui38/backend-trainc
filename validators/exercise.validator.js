const Joi = require("@hapi/joi");

module.exports = function (fields = []) {
    const getSchema = (field) => {
        switch (field) {
            case "code":
                return Joi.string().min(2).max(255).required();
            case "content":
                return Joi.string().min(2).max(2000).required();
            case "course":
                return Joi.string()
                    .min(2)
                    .max(255)
                    .trim()
                    .lowercase()
                    .regex(/^[a-zA-Z0-9 ]+$/)
                    .required();
            case "group":
                return Joi.string().min(2).max(255);
            case "active":
                return Joi.boolean().required();
            case "point":
                return Joi.number().required();
            case "attempt":
                return Joi.number().required();
            case "deadline":
                return Joi.date().required();
        }
    };

    const schema = {};

    for (let item of fields) {
        schema[`${item}`] = getSchema(item);
    }

    return schema;
};

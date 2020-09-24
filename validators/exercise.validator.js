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
                    .regex(/^[a-zA-Z ]/)
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
                return Joi.object({
                    day: Joi.number().min(1).max(31).required(),
                    month: Joi.number().min(1).max(12).required(),
                    year: Joi.number().min(2020).max(2030).required(),
                    hour: Joi.number().min(0).max(23).required(),
                    minute: Joi.number().min(0).max(59).required(),
                }).required();
        }
    };

    const schema = {};

    for (let item of fields) {
        schema[`${item}`] = getSchema(item);
    }

    return schema;
};

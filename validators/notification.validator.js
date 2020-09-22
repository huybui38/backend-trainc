const Joi = require("@hapi/joi");

module.exports = function (fields = []) {
    const getSchema = (field) => {
        switch (field) {
            case "content":
                return Joi.string().min(1).max(2000).required();
            case "course":
                return Joi.string()
                    .min(1)
                    .max(255)
                    .trim()
                    .lowercase()
                    .regex(/^[a-zA-Z ]/)
                    .required();
        }
    };

    const schema = {};

    for (let item of fields) {
        schema[`${item}`] = getSchema(item);
    }

    return schema;
};

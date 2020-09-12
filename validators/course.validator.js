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

const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

module.exports = function (fields = []) {
    const getSchema = (field) => {
        switch (field) {
            case "id":
                return Joi.objectId();
            case "name":
                return Joi.string()
                    .min(2)
                    .max(255)
                    .trim()
                    .lowercase()
                    .regex(/^[a-zA-Z ]+$/)
                    .required();
            case "active":
                return Joi.boolean().required();
            case "thumbnail":
                return Joi.string().min(2).max(2000).required();
        }
    };

    const schema = {};

    for (let item of fields) {
        schema[`${item}`] = getSchema(item);
    }

    return schema;
};

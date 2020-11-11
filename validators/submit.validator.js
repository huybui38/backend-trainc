const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const ExerciseStatusEnum = {
    PROCESS: "1",
    FAILED: "2",
    SUCCESS: "3",
    REJECT: "4",
};

module.exports = function (fields = []) {
    const getSchema = (field) => {
        switch (field) {
            case "id":
                return Joi.objectId();
            case "code":
                return Joi.string().min(8).alphanum().trim().lowercase().max(8).required();
            case "status":
                return Joi.string()
                    .valid(
                        ExerciseStatusEnum.FAILED,
                        ExerciseStatusEnum.PROCESS,
                        ExerciseStatusEnum.REJECT,
                        ExerciseStatusEnum.SUCCESS
                    )
                    .required();
            case "user":
                return Joi.string().min(8).alphanum().trim().lowercase().max(8).required();
            case "point":
                return Joi.number.required();
            case "comment":
                return Joi.string.required();
        }
    };

    const schema = {};

    for (let item of fields) {
        schema[`${item}`] = getSchema(item);
    }

    return schema;
};

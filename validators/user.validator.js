const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);
const { UserRoleEnum } = require("../helpers/userRoleEnum.helper");

module.exports = function (fields = []) {
    const getSchema = (field) => {
        switch (field) {
            case "id":
                return Joi.objectId();
            case "code":
                return Joi.string().min(8).alphanum().trim().max(8).required().uppercase();
            case "password":
                return Joi.string().min(8).max(255).alphanum().required();
            case "name":
                return Joi.string()
                    .min(2)
                    .max(255)
                    .regex(
                        /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/
                    )
                    .trim()
                    .required();
            case "role":
                return Joi.string().valid(UserRoleEnum.MENTOR, UserRoleEnum.STUDENT).required();
            case "point":
                return Joi.number().required();
            case "active":
                return Joi.boolean().required();
            case "newPassword":
                return Joi.string().min(8).max(255).alphanum().required();
            case "confirm":
                return Joi.string().min(8).max(255).alphanum().required().valid(Joi.ref("newPassword"));
        }
    };

    const schema = {};

    for (let item of fields) {
        schema[`${item}`] = getSchema(item);
    }

    return schema;
};

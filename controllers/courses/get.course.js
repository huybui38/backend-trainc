const { AsyncCatch } = require("../../helpers/utils.helper");
const { NotFound, DefaultError } = require("../../helpers/errors.helper");
const { Course } = require("../../models/Course.model");
const validator = require("../../helpers/validator.helper");
const validatorSchema = require("../../validators/group.validator");

module.exports = AsyncCatch(async (req, res, next) => {
    const params = validator(validatorSchema(["id"]), req.params);
    const course = await Course.findById(params.id);
    if (!course) throw new NotFound("Not found.");
    
    res.send(course);
});
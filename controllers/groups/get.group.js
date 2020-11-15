const { AsyncCatch } = require("../../helpers/utils.helper");
const { NotFound, DefaultError } = require("../../helpers/errors.helper");
const { Group } = require("../../models/Group.model");
const { User } = require("../../models/User.model");
const { Course } = require("../../models/Course.model");
const validator = require("../../helpers/validator.helper");
const validatorSchema = require("../../validators/group.validator");

module.exports = AsyncCatch(async (req, res, next) => {
    const params = validator(validatorSchema(["id"]), req.params);
    const group = await Group.findById(params.id);
    if (!group) throw new NotFound("Not found.");

    const course = await Course.findById(group.course);
    if (!course) throw new DefaultError("Can't connect to database.");

    group.course = course.name;

    const users = await Promise.all(group.members.map((userCode) => User.findOne({ code: userCode }, { password: 0 })));
    console.log(users);

    res.send([group, users]);
});

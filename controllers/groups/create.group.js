const { AsyncCatch } = require("../../helpers/utils.helper");
const { BadRequest, DefaultError, Unauthorized } = require("../../helpers/errors.helper");
const { Group } = require("../../models/Group.model");
const { Course } = require("../../models/Course.model");
const { User } = require("../../models/User.model");
const { hashingString } = require("../../helpers/bcrypt.helper");
const validator = require("../../helpers/validator.helper");
const validatorSchema = require("../../validators/group.validator");

module.exports = AsyncCatch(async (req, res, next) => {
    const input = validator(validatorSchema(["name", "password", "course"]), req.body);
    input.members = req.user.code;

    const course = await Course.findOne({ name: input.course });
    if (!course) throw new Unauthorized("Course is not correct.");

    if (course.groups.includes(input.name)) throw new BadRequest("Name is taken.");

    input.password = await hashingString(input.password);

    const group = await Group.create(input);
    if (!group) throw new DefaultError("Can't connect to database.");

    course.groups.push(group.name);
    const result = await Course.findOneAndUpdate({ _id: course._id }, { $set: { groups: course.groups } });
    if (!result) throw new DefaultError("Can't connect to database.");

    res.send("Group was created successfully.");
});

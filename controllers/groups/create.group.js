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
    input.course = course._id;

    const groups = await Promise.all(course.groups.map((id) => Group.findById(id, "name")));
    const names = groups.map((group) => group.name);
    if (names.includes(input.name)) throw new BadRequest("Name is taken.");

    input.password = await hashingString(input.password);

    const group = await Group.create(input);
    if (!group) throw new DefaultError("Can't connect to database.");

    const result = await Course.findByIdAndUpdate(course._id, { $push: { groups: group._id } });
    if (!result) throw new DefaultError("Can't connect to database.");

    res.send("Group was created successfully.");
});

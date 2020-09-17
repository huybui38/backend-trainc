const { AsyncCatch } = require("../../helpers/utils.helper");
const { BadRequest, DefaultError, Unauthorized } = require("../../helpers/errors.helper");
const { Group } = require("../../models/Group.model");
const { Course } = require("../../models/Course.model");
const { User } = require("../../models/User.model");
const { hashingString } = require("../../helpers/bcrypt.helper");
const validator = require("../../helpers/validator.helper");
const validatorSchema = require("../../validators/group.validator");

const createGroup = AsyncCatch(async (req, res, next) => {
    const input = validator(validatorSchema(["name", "password", "course"]), req.body);
    input.mentors = req.user.code;

    const group = await Group.findOne({ name: input.name });
    if (group) throw new BadRequest("Name is taken.");

    const course = await Course.findOne({ name: input.course });
    if (!course) throw new Unauthorized("Course is not correct.");

    const user = await User.findOne({ code: input.mentors });
    if (!user) throw new Unauthorized("Mentors are not correct.");

    input.password = await hashingString(input.password);
    const result = await Group.create(input);
    if (!result) throw new DefaultError("Can't connect to database.");

    res.send("Group was created successfully.");
});

module.exports = createGroup;

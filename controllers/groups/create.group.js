const { AsyncCatch } = require("../../helpers/utils.helper");
const { BadRequest, DefaultError, Unauthorized } = require("../../helpers/errors.helper");
const { Group } = require("../../models/Group.model");
const { Course } = require("../../models/Course.model");
const { User } = require("../../models/User.model");
const { hashingString } = require("../../helpers/bcrypt.helper");
const validator = require("../../helpers/validator.helper");
const validatorSchema = require("../../validators/group.validator");

const createGroup = AsyncCatch(async (req, res, next) => {
    const input = validator(validatorSchema(["name", "password", "course", "mentors"]), req.body);
    const group = await Group.findOne({ name: input.name });
    if (group) throw new BadRequest("Name is taken.");

    const course = await Course.findOne({ name: input.course });
    if (!course) throw new Unauthorized("Course is not correct.");

    for (let mentor of input.mentors) {
        const user = await User.findOne({ code: mentor });
        if (!user) throw new Unauthorized("Mentors is not correct.");
    }

    input.password = await hashingString(input.password);
    const result = await Group.create(input);
    if (!result) throw new DefaultError("Can't connect to database.");

    res.send("Create group successful.");
});

module.exports = createGroup;

const { AsyncCatch } = require("../../helpers/utils.helper");
const { DefaultError, NotFound, Unauthorized, BadRequest } = require("../../helpers/errors.helper");
const { Group } = require("../../models/Group.model");
const { Course } = require("../../models/Course.model");
const { compareHashingString } = require("../../helpers/bcrypt.helper");
const validator = require("../../helpers/validator.helper");
const validatorSchema = require("../../validators/group.validator");

module.exports = AsyncCatch(async (req, res, next) => {
    const group = await Group.findById(req.params.id);
    if (!group) throw new NotFound("Not found.");

    const input = validator(validatorSchema(["password"]), req.body);

    const isCorrect = await compareHashingString(input.password, group.password);
    if (!isCorrect) throw new Unauthorized("Password is not correct.");

    if (group.members.includes(req.user.code)) throw new BadRequest("You have already enrolled.");

    const result = await Group.findByIdAndUpdate(group._id, { $push: { members: req.user.code } });
    if (!result) throw new DefaultError("Can't connect to database.");

    const course = await Course.findOneAndUpdate({ name: group.course }, { $push: { students: req.user.code } });
    if (!course) throw new DefaultError("Can't connect to database.");

    res.send("Enroll success.");
});

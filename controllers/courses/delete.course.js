const { AsyncCatch } = require("../../helpers/utils.helper");
const { DefaultError, NotFound, Unauthorized } = require("../../helpers/errors.helper");
const { Course } = require("../../models/Course.model");
const { Group } = require("../../models/Group.model");
const { User } = require("../../models/User.model");
const validator = require("../../helpers/validator.helper");
const validatorSchema = require("../../validators/course.validator");

module.exports = AsyncCatch(async (req, res, next) => {
    const params = validator(validatorSchema(["id"]), req.params);
    const course = await Course.findById(params.id);
    if (!course) throw new NotFound("Not found.");

    //xoa groups va course
    await Promise.all(
        course.groups.map(async (groupId) => {
            const group = await Group.findById(groupId);
            // xoa members va group
            const members = await Promise.all(
                group.members.map((userId) => {
                    User.findByIdAndUpdate(userId, { $pull: { group: group._id } });
                    Group.findByIdAndUpdate(group._id, { $pull: { members: userId } });
                })
            );
            if (!members) throw new DefaultError("Can't connect to database.");

            //xoa students va course
            const students = await Promise.all(
                group.members.map((userId) => {
                    User.findByIdAndUpdate(userId, { $pull: { courses: group.course } });
                    Course.findByIdAndUpdate(group.course, { $pull: { students: userId } });
                })
            );
            if (!students) throw new DefaultError("Can't connect to database.");

            //xoa group va course
            const groups = await Promise.all([
                Group.findByIdAndDelete(group._id),
                Course.findByIdAndUpdate(group.course, { $pull: { groups: group._id } }),
            ]);
            if (!groups) throw new DefaultError("Can't connect to database.");

            return Promise.resolve();
        })
    );

    const result = await Course.findByIdAndDelete(course._id);
    if (!result) throw new DefaultError("Can't connect to database.");

    res.send("Course was deleted successfully.");
});

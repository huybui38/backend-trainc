const { AsyncCatch } = require("../../helpers/utils.helper");
const { NotFound } = require("../../helpers/errors.helper");
const { User } = require("../../models/User.model");
const _ = require("lodash");

const createUser = AsyncCatch(async (req, res, next) => {
    const user = _.pick(req.user, ["mssv", "point", "name", "listExercise", "listCourse", "listClass", "role"]);

    if (user.mssv !== req.params.mssv) throw new NotFound("Not found.");

    res.send(user);
});

module.exports = createUser;

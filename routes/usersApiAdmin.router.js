const express = require("express");
const router = express.Router();
const { User } = require("../models/user.model");
const _ = require("lodash");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");

router.post("/create", [auth, isAdmin], async (req, res) => {
    const info = _.pick(req.body, ["mssv", "name", "password", "confirm", "role"]);
    const { error, value } = User.validateAdminCreate(info);
    if (error)
        return res.status(400).json({
            status: 400,
            data: null,
            text: error,
        });

    const isUnique = await User.isUnique("mssv", value.mssv);
    if (!isUnique)
        return res.status(400).json({
            status: 400,
            data: null,
            msg: "MSSV is taken.",
        });

    const newUser = new User(_.pick(value, ["mssv", "password", "name", "role"]));
    await newUser.createNewUser();
    res.status(200).json({
        status: 200,
        data: null,
        msg: "Register successful.",
    });
});

router.put("/update", [auth], async (req, res) => {
    const info = _.pick(req.body, ["mssv", "role", "active"]);

    const { error, value } = User.validateAdminUpdate(info);
    if (error)
        return res.status(400).json({
            status: 400,
            data: null,
            text: error,
        });

    if (!(await User.updateUser(value)))
        return res.status(400).json({
            status: 400,
            data: null,
            text: "MSSV is not correct.",
        });

    res.status(200).json({
        status: 200,
        data: null,
        text: "Update successful.",
    });
});

module.exports = router;

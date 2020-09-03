const express = require("express");
const router = express.Router();
const { User } = require("../models/user.model");
const _ = require("lodash");

router.post("/login", async (req, res) => {
    const info = _.pick(req.body, ["mssv", "password"]);

    const { error, value } = User.validateLogin(info);
    if (error)
        return res.status(400).json({
            status: 400,
            data: null,
            text: "input is incorrect",
        });

    const user = await User.loginUser(info);
    if (!user)
        return res.status(401).json({
            status: 401,
            data: null,
            text: "mssv or password is not correct.",
        });

    res.status(200).json({
        status: 200,
        data: null,
        text: "Login successful.",
    });
});

router.post("/create", async (req, res) => {
    const info = _.pick(req.body, ["mssv", "name", "password", "confirm", "role"]);

    const { error, value } = User.validateCreate(info);
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

module.exports = router;

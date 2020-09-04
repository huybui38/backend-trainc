const express = require("express");
const router = express.Router();
const { User } = require("../models/user.model");
const _ = require("lodash");
const auth = require("../middleware/auth");

router.post("/login", async (req, res) => {
    const info = _.pick(req.body, ["mssv", "password"]);

    const { error, value } = User.validateLogin(info);
    if (error)
        return res.status(400).json({
            status: 400,
            data: null,
            text: "Input is incorrect",
        });

    const user = await User.loginUser(value);
    if (!user)
        return res.status(401).json({
            status: 401,
            data: null,
            text: "MSSV or password is not correct.",
        });

    const token = User.getToken(user);
    res.status(200).cookie("token", token).json({
        status: 200,
        data: null,
        text: "Login successful.",
    });
});

router.put("/changePassword", [auth], async (req, res) => {
    const info = _.pick(req.body, ["currentPassword", "newPassword", "confirm"]);

    const { error, value } = User.validateChangePassword(info);
    if (error)
        return res.status(400).json({
            status: 400,
            data: null,
            text: error,
        });

    if (!(await req.user.changePassword(value)))
        return res.status(400).json({
            status: 400,
            data: null,
            text: "Username or current-password is not correct.",
        });

    res.status(200).json({
        status: 200,
        data: null,
        text: "Change password successful.",
    });
});

router.put("/changeName", [auth], async (req, res) => {
    const info = _.pick(req.body, ["name", "password"]);

    const { error, value } = User.validateChangeName(info);
    if (error)
        return res.status(400).json({
            status: 400,
            data: null,
            text: error,
        });

    if (!(await req.user.changeName(value)))
        return res.status(400).json({
            status: 400,
            data: null,
            text: "Password is not correct.",
        });

    res.status(200).json({
        status: 200,
        data: null,
        text: "Change name successful.",
    });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const { Course } = require("../models/course.model");

router.post("/create", async (req, res) => {
    info = { courseName: req.body.courseName };
    const { error, value } = Course.validateCreate(info);

    if (error)
        return res.status(400).json({
            status: 400,
            data: null,
            text: error,
        });

    const newCourse = new Course(value);
    await newCourse.createNewCourse();
    res.status(200).json({
        status: 200,
        data: null,
        msg: "Create course successful.",
    });
});

module.exports = router;

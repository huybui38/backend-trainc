const { NotFound } = require("../helpers/errors.helper");
const { AsyncCatch } = require("../helpers/utils.helper");
const { Exercise } = require("../models/Exercise.model");
const { exec } = require("child_process");

module.exports = AsyncCatch(async (req, res, next) => {
    req.runFile = req.file.destination + Date.now();
    const compiler = exec("gcc " + req.file.path + " -o " + "checkExercise", (error, stdout, stderr) => {
        if (error) {
            res.send(stderr);
        } else {
            next();
        }
    });
});

const { AsyncCatch } = require("../../helpers/utils.helper");
const { BadRequest, DefaultError } = require("../../helpers/errors.helper");
const { writeFileCustom, execShellCommand } = require("../../helpers/fileExec.helper");

module.exports = AsyncCatch(async (req, res, next) => {
    const result = [];
    for (const testcase of req.exercise.testcase) {
        await writeFileCustom(testcase.input);
        const output = await execShellCommand("" + "checkExercise" + " < " + "input.inp");

        if (output === testcase.output) result.push({ input: testcase.input, realOutput: output, testcase: true });
        else result.push({ input: testcase.input, realOutput: output, testcase: false });
    }
    res.send(result);
});

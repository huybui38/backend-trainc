function execShellCommand(cmd) {
    const exec = require("child_process").exec;
    return new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                console.warn(error);
            }
            resolve(stdout ? stdout : stderr);
        });
    });
}

function writeFileCustom(input) {
    const fs = require("fs");
    return new Promise((resolve, reject) => {
        fs.writeFile("input.inp", input, (err) => {
            if (!err) {
                resolve();
            }
        });
    });
}

module.exports = { execShellCommand, writeFileCustom };

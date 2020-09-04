const bcrypt = require("bcrypt");

const hashingString = async (value, round) => {
        const salt = await bcrypt.genSalt(round);
        return await bcrypt.hash(value, salt);
};

const compareHashingString = async (currentString, originalString) => {
        const isCorrect = await bcrypt.compare(currentString, originalString);
        return isCorrect;
};

module.exports = { hashingString, compareHashingString };

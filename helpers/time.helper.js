const moment = require("moment");

module.exports.formatDateOutput = function (time) {
    return moment(time).format("MM/DD/yyyy hh:mm a");
};

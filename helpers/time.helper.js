const moment = require("moment");

module.exports.formatDate = function ({ year, month, day, hour, minute }) {
    return moment(year + "-" + month + "-" + day + " " + hour + ":" + minute, "YYYY-MM-DD HH:mm");
};

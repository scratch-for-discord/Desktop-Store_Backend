const { randomBytes } = require("crypto");

module.exports = function() {
    return randomBytes(64).toString("hex");
}
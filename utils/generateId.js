const Snowflake = require("snowflake-util");
const snowflake = new Snowflake({
    epoch: new Date(2020, 0, 1)
});

module.exports.generateId = function(timestamp) {
    return snowflake.generate(timestamp);
}

module.exports.decodeId = function(id) {
    return snowflake.deconstruct(id);
}
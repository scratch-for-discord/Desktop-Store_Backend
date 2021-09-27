const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/s4dserver");

mongoose.connection.on("connected", () => {
    console.log("Connected to the database!");
});

module.exports = mongoose;
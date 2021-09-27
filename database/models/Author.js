const mongoose = require("mongoose");
const generateToken = require("../../utils/generateToken");

const AuthorModel = new mongoose.Schema({
    id: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    verified: {
        type: mongoose.SchemaTypes.Boolean,
        default: false
    },
    accessToken: {
        type: mongoose.SchemaTypes.String,
        required: true,
        default: generateToken
    }
});

module.exports = mongoose.model("Author", AuthorModel);
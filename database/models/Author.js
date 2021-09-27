const mongoose = require("mongoose");
const generateToken = require("../../utils/generateToken");

const AuthorModel = new mongoose.Schema({
    id: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    name: {
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
}, {
    timestamps: {
        updatedAt: "updatedAt",
        createdAt: "createdAt"
    }
});

module.exports = mongoose.model("Author", AuthorModel);
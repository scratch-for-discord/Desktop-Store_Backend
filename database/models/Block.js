const mongoose = require("mongoose");
const { generateId } = require("../../utils/generateId");

const BlockSchema = new mongoose.Schema({
    id: {
        type: mongoose.SchemaTypes.String,
        required: true,
        default: generateId
    },
    shortDescription: {
        type: mongoose.SchemaTypes.String,
        required: false,
        default: "No description available"
    },
    longDescription: {
        type: mongoose.SchemaTypes.String,
        required: false,
        default: "No description available"
    },
    tags: {
        type: mongoose.SchemaTypes.Array,
        required: false,
        default: []
    },
    block: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    toolbox: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    author: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    icon: {
        type: mongoose.SchemaTypes.String,
        required: false,
        default: "https://i.imgur.com/OyLZH3H.png",
        validate: {
            validator: (q) => {
                return /https:\/\/i.imgur.com\/(\S*)(\.[a-zA-Z]{3})/.test(q);
            },
            message: prop => `${prop.value} is not a valid image url`
        }
    },
    downloads: {
        type: mongoose.SchemaTypes.Number,
        required: false,
        default: 0
    }
}, {
    timestamps: {
        updatedAt: "updatedAt",
        createdAt: "createdAt"
    }
});

module.exports = mongoose.model("Block", BlockSchema);
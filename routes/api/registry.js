const { Router } = require("express");
const router = Router();
const BlocksModel = require("../../database/models/Block");
const AuthorModel = require("../../database/models/Author");
const checkAuth = require("../middlewares/checkAuth");
const blocksMeta = require("../middlewares/blocksMeta");

const uploader = async (req, res) => {
    const block = req.blocksMeta;
    const old = await BlocksModel.findOne({
        id: block.metadata.id,
        author: block.author.id
    });

    if (!old) {
        const newBlock = new BlocksModel({
            id: block.metadata.id,
            shortDescription: block.metadata.shortDescription,
            longDescription: block.metadata.longDescription,
            tags: Array.isArray(block.metadata.tags) ? block.metadata.tags : [],
            author: block.author.id,
            icon: block.metadata.icon,
            block: block.blocksData
        });

        await newBlock.save();
    } else {
        await BlocksModel.updateOne({
            id: block.metadata.id,
            author: block.author.id
        }, {
            id: block.metadata.id,
            shortDescription: block.metadata.shortDescription,
            longDescription: block.metadata.longDescription,
            tags: Array.isArray(block.metadata.tags) ? block.metadata.tags : [],
            author: block.author.id,
            icon: block.metadata.icon,
            block: block.blocksData
        });
    }

    return res.status(201).send();
};

// upload new block
router
    .route("/")
    .post(checkAuth, blocksMeta, uploader)
    .patch(checkAuth, blocksMeta, uploader)
    .put(checkAuth, blocksMeta, uploader);

router.get("/all", async (req, res) => {
    const data = await BlocksModel.find();
    const finalData = await Promise.all(data.map(async m => {
        const author = await AuthorModel.findOne({ id: m.author }) || {};

        const ret = {
            id: m.id,
            short_description: m.shortDescription,
            description: m.longDescription,
            tags: m.tags,
            author: {
                id: author.id,
                name: author.name,
                verified: author.verified,
                created_at: author.createdAt,
                updated_at: author.updated_at
            },
            icon: m.icon,
            downloads: m.downloads,
            updated_at: m.updatedAt,
            created_at: m.createdAt
        };

        return ret;
    }));

    return res.status(200).json(finalData);
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const data = await BlocksModel.findOne({ id });
    const isRequestedByApp = req.headers["req-track-incoming"] === "ScratchForDiscord/DESKTOP";

    if (!data) return res.status(404).json({
        error: `block with id "${id}" not found!`
    });

    const author = await AuthorModel.findOne({
        id: data.author
    });

    if (!author) return res.status(404).json({
        error: "something went wrong!"
    });

    res.status(200).json({
        id: data.id,
        short_description: data.shortDescription,
        description: data.longDescription,
        tags: data.tags,
        author: {
            id: author.id,
            name: author.name,
            verified: author.verified,
            created_at: author.createdAt,
            updated_at: author.updated_at
        },
        icon: data.icon,
        downloads: data.downloads,
        updated_at: data.updatedAt,
        created_at: data.createdAt
    });

    if (isRequestedByApp) {
        data.downloads++;
        await data.save().catch(() => {});
    };
});

module.exports = router;
const BlocksModel = require("../../database/models/Block");
const parseSafe = require("../../utils/parseSafe");

module.exports = async (req, res, next) => {
    const blocksMeta = {
        metadata: parseSafe(req.body.metadata),
        blocksData: req.body.scratchBlocks || null,
        author: req.publisher
    };

    console.log(req.body.metadata)
    for (const prop of Object.values(blocksMeta)) {
        console.log(prop);
        if (prop == null) return res.status(400).json({ error: "invalid request body" });
    }

    const isExistingBlock = await BlocksModel.findOne({ id: blocksMeta.metadata.id });
    if (isExistingBlock && isExistingBlock.author !== req.publisher.id) return res.status(403).json({
        error: `Block "${blocksMeta.metadata.id}" is owned by somebody else.`
    });

    req.blocksMeta = blocksMeta;

    return next();
}
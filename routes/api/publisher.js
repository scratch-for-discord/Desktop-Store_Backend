const { Router } = require("express");
const router = Router();
const AuthorModel = require("../../database/models/Author");
const { decodeId } = require("../../utils/generateId");

router.get("/", async (req, res) => {
    const data = await AuthorModel.find();
    return res.status(200).json({
        data: data.map(m => ({
            id: m.id,
            name: m.name,
            verified: m.verified,
            created_at: decodeId(m.id).timestamp
        }))
    });
});

router.get("/get", async (req, res) => {
    const token = req.headers["authorization"] || req.headers["Authorization"];
    if (!token) return res.status(401).json({ error: "missing authorization header" });
    const user = await AuthorModel.findOne({ accessToken: token });
    if (!user) return res.status(404).json({ error: "unknown publisher" });

    return res.status(200).json({
        id: user.id,
        name: user.name,
        verified: user.verified,
        created_at: decodeId(user.id).timestamp
    });
});

router.get("/:id", async (req, res) => {
    const user = await AuthorModel.findOne({ id: req.params.id });
    if (!user) return res.status(404).json({ error: "publisher with that id not found" });

    return res.status(200).json({
        id: user.id,
        name: user.name,
        verified: user.verified,
        created_at: decodeId(user.id).timestamp
    });
});


module.exports = router;
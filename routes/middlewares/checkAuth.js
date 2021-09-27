const AuthorModel = require("../../database/models/Author");

module.exports = async (req, res, next) => {
    const auth = req.headers["Authorization"] || req.headers["authorization"];
    if (!auth) return res.status(403).json({ error: "missing header authorization" });
    const hasUser = await AuthorModel.findOne({ accessToken: auth });
    if (!hasUser) return res.status(401).json({ error: "invalid access token" });

    req.publisher = hasUser;

    return next();
}
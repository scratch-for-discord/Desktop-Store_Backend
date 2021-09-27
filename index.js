require("dotenv").config();
require("./database/index");

const express = require("express");
const app = express();
const { ExpressServer, SlashCreator } = require("slash-create");
const creator = new SlashCreator({
    applicationID: process.env.DISCORD_CLIENT_ID,
    token: process.env.DISCORD_TOKEN,
    publicKey: process.env.DISCORD_PUBLIC_KEY,
    endpointPath: "/commands"
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    return res.status(200).json({ message: "hello world" });
});

creator
    .withServer(new ExpressServer(app, { alreadyListening: true }))
    .registerCommandsIn(`${__dirname}/routes/slash-command`);

app.use("/api/publishers", require("./routes/api/publisher"));
app.use("/api/registry", require("./routes/api/registry"));

app.all("*", (req, res) => {
    res.status(404).json({ error: "unknown route" });
});

app.use((error, _req, res, _next) => {
    console.error(error);
    res.status(500).json({ error: "internal server error", message: `${error.message || error}` });
});

app.listen(process.env.PORT || 3000, () => console.log(`HTTP server running on port *${process.env.PORT || 3000}`));
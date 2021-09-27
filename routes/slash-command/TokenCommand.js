const { SlashCommand, CommandContext } = require("slash-create");
const AuthorModel = require("../../database/models/Author");

class TokenCommand extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: "token",
            description: "Get your store access token"
        });
        this.filePath = __filename;
    }

    /**
     * @param {CommandContext} ctx
     */
    async run(ctx) {
        await ctx.defer(true);
        const user = ctx.user.id;
        let message = "";
        const existing = await AuthorModel.findOne({ id: user });
        if (!existing) message = "❌ | You are not registered as a block publisher!";
        else message = `✅ | Your access token is ||${existing.accessToken}|| (Make sure to keep this private)`;
        await ctx.sendFollowUp(message, {
            ephemeral: true
        });
    }
}

module.exports = TokenCommand;
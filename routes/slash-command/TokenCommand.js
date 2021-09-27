const { SlashCommand, CommandContext, CommandOptionType } = require("slash-create");
const AuthorModel = require("../../database/models/Author");
const generateToken = require("../../utils/generateToken");

class TokenCommand extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: "token",
            description: "Get your store access token",
            options: [
                {
                    name: "regenerate",
                    type: CommandOptionType.BOOLEAN,
                    description: "If the token should be regenerated",
                    required: true
                }
            ]
        });
        this.filePath = __filename;
    }

    /**
     * @param {CommandContext} ctx
     */
    async run(ctx) {
        await ctx.defer(true);
        const user = ctx.user.id;
        const existing = await AuthorModel.findOne({ id: user });
        if (!existing) {
            return await ctx.sendFollowUp("❌ | You are not registered as a block publisher!", { ephemeral: true });
        }
        if (!ctx.options.regenerate) {
            return await ctx.sendFollowUp(`✅ | Your access token is ||${existing.accessToken}|| (Make sure to keep this private)`, {
                ephemeral: true
            });
        }
        if (ctx.options.regenerate) {
            existing.accessToken = generateToken();
            await existing.save();

            await ctx.sendFollowUp(`✅ | Your new access token is ||${existing.accessToken}|| (Make sure to keep this private)`, {
                ephemeral: true
            });
        }
    }
}

module.exports = TokenCommand;
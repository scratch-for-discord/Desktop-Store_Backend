const { SlashCommand, CommandContext } = require("slash-create");
const AuthorModel = require("../../database/models/Author");

class RegisterCommand extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: "register",
            description: "Register yourself as a block publisher"
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
        if (existing) message = "❌ | You are already registered as a block publisher!";
        else {
            const newUser = new AuthorModel({
                id: user
            });

            await newUser.save();

            message = `✅ | You are now registered as a block publisher. Your access token is ||${newUser.accessToken}|| (Make sure to keep this private)`;
        }
        await ctx.sendFollowUp(message, {
            ephemeral: true
        });
    }
}

module.exports = RegisterCommand;
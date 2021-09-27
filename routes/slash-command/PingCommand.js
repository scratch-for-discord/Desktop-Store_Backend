const { SlashCommand, CommandContext } = require("slash-create");

class PingCommand extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: "ping",
            description: "Ping Pong, what else?"
        });
        this.filePath = __filename;
    }

    /**
     * @param {CommandContext} ctx
     */
    async run(ctx) {
        await ctx.defer(true);
        const message = `🏓 | Pong **${ctx.user.username}**!`;
        await ctx.sendFollowUp(message, {
            ephemeral: true
        });
    }
}

module.exports = PingCommand;
const { ApplicationCommandOptionType, EmbedBuilder, SlashCommandBuilder} = require("discord.js");
const {Intents} = require("../../Config");
const Permissions = require("../../PermissionENUM");

module.exports = {
    Integration: new SlashCommandBuilder()
        .setName("say")
        .setDescription("Make the bot talk like a real human.")
        .addStringOption(Option=>{
            return Option
                .setName("message")
                .setDescription("Your super interesting message!")
                .setRequired(true)
        }),

    Access : Permissions.Moderator,

    Code: (interaction) => {
        interaction.reply(interaction.options.get("message").value);
    }
}

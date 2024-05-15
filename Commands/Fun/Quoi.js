const {SlashCommandBuilder} = require("discord.js");
const Permissions = require("../../PermissionENUM");
module.exports = {
    Integration: new SlashCommandBuilder()
        .setName("quoi")
        .setDescription("feur"),

    Access: Permissions.Member,

    Code: async (interaction) => {
        interaction.reply("feur");
    }
}
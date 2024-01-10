const {SlashCommandBuilder} = require("discord.js");
const Permissions = require("../../PermissionENUM");

module.exports = {
    Integration: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("pong!"),

    Access : Permissions.Administrator,

    Code : (interaction) => {
        interaction.reply("pong!")
    }
}
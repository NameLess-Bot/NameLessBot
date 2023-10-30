const {SlashCommandBuilder} = require("discord.js");
module.exports = {
    Integration: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("pong!"),

    Code : (interaction) => {
        interaction.reply("pong!")
    }
}
const { ApplicationCommandOptionType, EmbedBuilder, SlashCommandBuilder} = require("discord.js");
const {Intents} = require("../../Config");

module.exports = {
    Integration: new SlashCommandBuilder()
        .setName("say")
        .setDescription("Faites donc parler le bot!")
        .addStringOption(Option=>{
            return Option
                .setName("message")
                .setDescription("le message à répéter.")
                .setRequired(true)
        }),

    Code: (interaction) => {
        interaction.reply(interaction.options.get("message").value);
    }
}

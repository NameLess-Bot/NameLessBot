const { ApplicationCommandOptionType, EmbedBuilder} = require("discord.js");
const {Intents} = require("../../Config");

module.exports = {
    Integration: {
        name: 'say',
        description: 'Faire dire quelque chose au bot !',
        options: [
            {
                name: "message",
                description: "Ce que le bot va répéter.",
                type: ApplicationCommandOptionType.String,
                required: true,
            },
        ],
    },

    Code: (interaction) => {
            interaction.reply(interaction.options.get("message").value);
    }
}

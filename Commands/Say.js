const {ApplicationCommandOptionType} = require("discord.js");
module.exports = {
    Integration: {
        name: 'say',
        description : 'make the bot say something!',
        options:[
            {
                name: "message",
                description: "what the bot will repeat.",
                type: ApplicationCommandOptionType.String,
                required: true,
            },
        ]
    },

    Code : (interaction) => {
        interaction.reply(interaction.options.get("message").value)
    }
}
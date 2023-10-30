const {ApplicationCommandOptionType} = require("discord.js");
module.exports = [
    {
        name: 'ping',
        description: 'nuh uh',
    },
    {
        name: 'deez_what_sir',
        description: "???",
    },
    {
        name: "say",
        description: "make the bot talk",
        options:[
            {
                name: "message",
                description:"what the bot is gonna repeat",
                type: ApplicationCommandOptionType.String,
                required:true,
            }
        ]
    }
]
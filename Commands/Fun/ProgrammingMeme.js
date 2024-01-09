const { ApplicationCommandOptionType, EmbedBuilder, SlashCommandBuilder} = require("discord.js");
const {Intents} = require("../../Config");
const Config = require("../../Config");
const Permissions = require("../../PermissionENUM");

module.exports = {
    Integration: new SlashCommandBuilder()
        .setName("programming-meme")
        .setDescription("🤓☝ Erm ackchually, TypeScript is infinitely superior to JavaScript!!"),

    Access : Permissions.Member,

    Code: async (interaction) => {
        try {
            const response = await fetch("https://programming-memes-images.p.rapidapi.com/v1/memes", {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': Config.RapidAPI_Key,
                    'X-RapidAPI-Host': 'programming-memes-images.p.rapidapi.com'
                },
            });

            const data = await response.json();

            if (data.length > 0) {
                if ("image" in data[0]) {
                    interaction.reply(data[0].image)
                }
            }

        } catch (error){
            console.log(`[!] ProgrammingMeme.js : An Error occured.\n${error}`)
        }
    }
}



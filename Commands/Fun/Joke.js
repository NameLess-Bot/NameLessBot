const { ApplicationCommandOptionType, EmbedBuilder, SlashCommandBuilder} = require("discord.js");
const {Intents} = require("../../Config");
const Config = require("../../Config");

module.exports = {
    Integration: new SlashCommandBuilder()
        .setName("joke")
        .setDescription("Have a good laugh!"),

    Code: async (interaction) => {
        try {
            const response = await fetch("https://jokes-by-api-ninjas.p.rapidapi.com/v1/jokes", {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': Config.RapidAPI_Key,
                    'X-RapidAPI-Host': 'jokes-by-api-ninjas.p.rapidapi.com'
                },
            });

            const data = await response.json();

            if ("joke" in data[0]){
                interaction.reply(data[0].joke);
            }else{
                interaction.reply("Hmm, i can't think of any jokes right now, sorry!");
            }
        } catch (error){
            console.log(`[!] Joke.js : An Error occured.\n${error}`)
        }
    }
}

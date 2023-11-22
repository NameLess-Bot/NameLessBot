const { ApplicationCommandOptionType, EmbedBuilder, SlashCommandBuilder} = require("discord.js");
const {Intents} = require("../../Config");

const HighLove = {
    "Wow! 💖 User1 and User2 are head over heels in love with each other, scoring an incredible X% on the love scale! 🚀",

}

const LowLove = {

}

module.exports = {
    Integration: new SlashCommandBuilder()
        .setName("lovecalc")
        .setDescription("Shows the compatibility between two persons 😳")
        .addStringOption(Option=>{
            return Option
                .setName("name1")
                .setRequired(true)
        })
        .addStringOption(Option=>{
            return Option
                .setName("name2")
                .setRequired(true)
        }),

        Code: (interaction) => {
            const lovePercentage = Math.floor(Math.random() * (100 - 0));

            const name1 = interaction.options.get("name1").value;
            const name2 = interaction.options.get("name2").value;


        }
}

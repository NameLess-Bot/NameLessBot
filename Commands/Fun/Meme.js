const { ApplicationCommandOptionType, EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const Permissions = require("../../PermissionENUM");

module.exports = {
    Integration: new SlashCommandBuilder()
        .setName("rmeme")
        .setDescription("Affiche un mème aléatoire 😂"),

    Access: Permissions.Member,

    Code: async (interaction) => {
        try {
            const response = await fetch('https://api.imgflip.com/get_memes');
            const data = await response.json();
            const memes = data.data.memes;
            const meme = memes[Math.floor(Math.random() * memes.length)];

            const embed = new EmbedBuilder()
                .setTitle(`😂 Mème Aléatoire: ${meme.name} 😂`)
                .setImage(meme.url)
                .setColor(0xFFD700);

            interaction.reply({ embeds: [embed.toJSON()] });
        } catch (error) {
            interaction.reply("Désolé, je n'ai pas pu obtenir un mème. Veuillez réessayer plus tard.");
        }
    }
};

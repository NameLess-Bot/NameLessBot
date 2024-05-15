const { ApplicationCommandOptionType, EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const Permissions = require("../../PermissionENUM");

module.exports = {
    Integration: new SlashCommandBuilder()
        .setName("chat")
        .setDescription("Affiche une image aléatoire de chat 🐱"),

    Access: Permissions.Member,

    Code: async (interaction) => {
        try {
            const response = await fetch('https://api.thecatapi.com/v1/images/search');
            const data = await response.json();
            const imageUrl = data[0].url;

            const embed = new EmbedBuilder()
                .setTitle("🐱 Chat Aléatoire 🐱")
                .setImage(imageUrl)
                .setColor(0xFFC0CB);

            interaction.reply({ embeds: [embed.toJSON()] });
        } catch (error) {
            interaction.reply("Désolé, je n'ai pas pu obtenir une image de chat. Veuillez réessayer plus tard.");
        }
    }
};

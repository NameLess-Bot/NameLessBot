const { ApplicationCommandOptionType, EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const Permissions = require("../../PermissionENUM");

module.exports = {
    Integration: new SlashCommandBuilder()
        .setName("chien")
        .setDescription("Affiche une image aléatoire de chien 🐶"),

    Access: Permissions.Member,

    Code: async (interaction) => {
        try {
            const response = await fetch('https://dog.ceo/api/breeds/image/random');
            const data = await response.json();
            const imageUrl = data.message;

            const embed = new EmbedBuilder()
                .setTitle("🐶 Chien Aléatoire 🐶")
                .setImage(imageUrl)
                .setColor(0xFFA500);

            interaction.reply({ embeds: [embed.toJSON()] });
        } catch (error) {
            interaction.reply("Désolé, je n'ai pas pu obtenir une image de chien. Veuillez réessayer plus tard.");
        }
    }
};

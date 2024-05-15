const { ApplicationCommandOptionType, EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const Permissions = require("../../PermissionENUM");

module.exports = {
    Integration: new SlashCommandBuilder()
        .setName("paysage")
        .setDescription("Affiche une image de paysage aléatoire 🌄"),

    Access: Permissions.Member,

    Code: async (interaction) => {
        try {
            const response = await fetch('https://source.unsplash.com/random/800x600/?landscape');
            const imageUrl = response.url;

            const embed = new EmbedBuilder()
                .setTitle("🌄 Paysage Aléatoire 🌄")
                .setImage(imageUrl)
                .setColor(0x4682B4);

            interaction.reply({ embeds: [embed.toJSON()] });
        } catch (error) {
            interaction.reply("Désolé, je n'ai pas pu obtenir une image de paysage. Veuillez réessayer plus tard.");
        }
    }
};

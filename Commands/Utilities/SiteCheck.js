const { ApplicationCommandOptionType, EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const Permissions = require("../../PermissionENUM");

module.exports = {
    Integration: new SlashCommandBuilder()
        .setName("sitecheck")
        .setDescription("Vérifie si un site Web est accessible 🌐")
        .addStringOption(option =>
            option.setName("url")
                .setDescription("L'URL du site Web à vérifier")
                .setRequired(true)),

    Access: Permissions.Member,

    Code: async (interaction) => {
        const url = interaction.options.get("url").value;

        try {
            const response = await fetch(url);
            const status = response.status;

            const embed = new EmbedBuilder()
                .setTitle("🌐 Vérification du Site Web 🌐")
                .setDescription(`Le site **${url}** est accessible et a répondu avec le statut **${status}**.`)
                .setColor(0x00FF00);

            interaction.reply({ embeds: [embed.toJSON()] });
        } catch (error) {
            const embed = new EmbedBuilder()
                .setTitle("🌐 Vérification du Site Web 🌐")
                .setDescription(`Le site **${url}** n'est pas accessible. Veuillez vérifier l'URL et réessayer.`)
                .setColor(0xFF0000);

            interaction.reply({ embeds: [embed.toJSON()] });
        }
    }
};
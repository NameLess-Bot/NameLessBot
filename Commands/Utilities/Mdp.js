const { ApplicationCommandOptionType, EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const Permissions = require("../../PermissionENUM");

module.exports = {
    Integration: new SlashCommandBuilder()
        .setName("motdepasse")
        .setDescription("Génère un mot de passe aléatoire sécurisé 🔐")
        .addIntegerOption(option =>
            option.setName("longueur")
                .setDescription("La longueur du mot de passe")
                .setRequired(true)),

    Access: Permissions.Member,

    Code: (interaction) => {
        const length = interaction.options.get("longueur").value;
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
        let password = "";

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }

        const embed = new EmbedBuilder()
            .setTitle("🔐 Mot de Passe Généré 🔐")
            .setDescription(`\`${password}\``)
            .setColor(0x4CAF50);

        interaction.reply({ embeds: [embed.toJSON()] });
    }
};

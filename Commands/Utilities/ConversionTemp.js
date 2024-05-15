const { ApplicationCommandOptionType, EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const Permissions = require("../../PermissionENUM");

module.exports = {
    Integration: new SlashCommandBuilder()
        .setName("temperature")
        .setDescription("Convertit une température entre Celsius et Fahrenheit 🌡️")
        .addNumberOption(option =>
            option.setName("valeur")
                .setDescription("La valeur de la température à convertir")
                .setRequired(true))
        .addStringOption(option =>
            option.setName("unité")
                .setDescription("L'unité de la température (C ou F)")
                .setRequired(true)),

    Access: Permissions.Member,

    Code: (interaction) => {
        const value = interaction.options.get("valeur").value;
        const unit = interaction.options.get("unité").value.toUpperCase();

        let convertedValue;
        let targetUnit;

        if (unit === "C") {
            convertedValue = (value * 9/5) + 32;
            targetUnit = "F";
        } else if (unit === "F") {
            convertedValue = (value - 32) * 5/9;
            targetUnit = "C";
        } else {
            return interaction.reply("Unité invalide. Veuillez utiliser 'C' pour Celsius ou 'F' pour Fahrenheit.");
        }

        const embed = new EmbedBuilder()
            .setTitle("🌡️ Conversion de Température 🌡️")
            .setDescription(`${value}°${unit} = ${convertedValue.toFixed(2)}°${targetUnit}`)
            .setColor(0x1E90FF);

        interaction.reply({ embeds: [embed.toJSON()] });
    }
};

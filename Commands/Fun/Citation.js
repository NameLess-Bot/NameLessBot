const { ApplicationCommandOptionType, EmbedBuilder, SlashCommandBuilder} = require("discord.js");
const Permissions = require("../../PermissionENUM");

const quotes = [
    "La vie est ce qui arrive quand vous êtes occupé à faire d'autres projets. - John Lennon",
    "Le seul moyen de faire du bon travail est d'aimer ce que vous faites. - Steve Jobs",
    "Le succès, c'est se promener d'échec en échec tout en restant motivé. - Winston Churchill",
    "N'abandonnez jamais, car c'est peut-être le dernier coup de marteau qui fendra la pierre. - Proverbe chinois",
    "La plus grande gloire n'est pas de ne jamais tomber, mais de se relever à chaque chute. - Confucius"
];

module.exports = {
    Integration: new SlashCommandBuilder()
        .setName("citation")
        .setDescription("Affiche une citation inspirante 🌟"),

    Access : Permissions.Member,

    Code: (interaction) => {
        const quote = quotes[Math.floor(Math.random() * quotes.length)];

        const embed = new EmbedBuilder()
            .setTitle("🌟 Citation inspirante 🌟")
            .setDescription(quote)
            .setColor(0xFFD700)

        interaction.reply({ embeds: [embed.toJSON()] });
    }
}
const { ApplicationCommandOptionType, EmbedBuilder, SlashCommandBuilder} = require("discord.js");
const Permissions = require("../../PermissionENUM");

const funFacts = [
    "Les abeilles peuvent reconnaître les visages humains.",
    "Un groupe de flamants roses s'appelle un 'flamboyance'.",
    "Les paresseux peuvent retenir leur respiration plus longtemps que les dauphins.",
    "Les vaches ont des meilleurs amis et peuvent devenir stressées quand elles sont séparées.",
    "Les bananes sont des baies, mais les fraises ne le sont pas."
];

module.exports = {
    Integration: new SlashCommandBuilder()
        .setName("faitamusant")
        .setDescription("Partage un fait amusant 😜"),

    Access : Permissions.Member,

    Code: (interaction) => {
        const funFact = funFacts[Math.floor(Math.random() * funFacts.length)];

        const embed = new EmbedBuilder()
            .setTitle("🤓 Fait amusant 🤓")
            .setDescription(funFact)
            .setColor(0xFFA500)

        interaction.reply({ embeds: [embed.toJSON()] });
    }
}
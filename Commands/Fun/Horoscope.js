const { ApplicationCommandOptionType, EmbedBuilder, SlashCommandBuilder} = require("discord.js");
const Permissions = require("../../PermissionENUM");

const horoscopes = {
    "aries": "Aujourd'hui, les Béliers vont ressentir un regain d'énergie et de motivation. Profitez-en pour accomplir vos tâches en attente!",
    "taurus": "Les Taureaux devraient se concentrer sur leur bien-être personnel aujourd'hui. Prenez du temps pour vous détendre et recharger vos batteries.",
    "gemini": "Les Gémeaux, vous pourriez être confrontés à des décisions importantes. Fiez-vous à votre intuition pour faire les bons choix.",
    "cancer": "Les Cancers peuvent s'attendre à une journée paisible et harmonieuse. Profitez de la compagnie de vos proches.",
    "leo": "Les Lions, aujourd'hui est un bon jour pour briller et montrer vos talents. Ne soyez pas timide, laissez votre lumière intérieure rayonner.",
    "virgo": "Les Vierges devraient se concentrer sur l'organisation et la planification. Un peu de préparation vous mènera loin.",
    "libra": "Les Balances vont bénéficier d'un sentiment de paix et d'équilibre. Profitez de cette journée pour résoudre tout conflit en suspens.",
    "scorpio": "Les Scorpions, aujourd'hui est le moment idéal pour explorer vos passions et vous lancer dans de nouveaux projets.",
    "sagittarius": "Les Sagittaires peuvent s'attendre à une journée remplie d'aventures et de découvertes. Suivez votre curiosité où qu'elle vous mène.",
    "capricorn": "Les Capricornes, aujourd'hui est un jour pour se concentrer sur vos objectifs à long terme. Faites des plans solides pour l'avenir.",
    "aquarius": "Les Verseaux, aujourd'hui est une journée propice aux nouvelles rencontres et aux idées innovantes. Soyez ouverts aux opportunités.",
    "pisces": "Les Poissons devraient se laisser guider par leur imagination et leur créativité aujourd'hui. Laissez libre cours à votre inspiration."
};

module.exports = {
    Integration: new SlashCommandBuilder()
        .setName("horoscope")
        .setDescription("Obtiens ton horoscope quotidien 🔮")
        .addStringOption(option =>
            option.setName("signe")
                .setDescription("Ton signe astrologique")
                .setRequired(true)
                .addChoices(
                    { name: "Bélier", value: "aries" },
                    { name: "Taureau", value: "taurus" },
                    { name: "Gémeaux", value: "gemini" },
                    { name: "Cancer", value: "cancer" },
                    { name: "Lion", value: "leo" },
                    { name: "Vierge", value: "virgo" },
                    { name: "Balance", value: "libra" },
                    { name: "Scorpion", value: "scorpio" },
                    { name: "Sagittaire", value: "sagittarius" },
                    { name: "Capricorne", value: "capricorn" },
                    { name: "Verseau", value: "aquarius" },
                    { name: "Poissons", value: "pisces" }
                )),

    Access: Permissions.Member,

    Code: (interaction) => {
        const sign = interaction.options.get("signe").value;
        const horoscope = horoscopes[sign];

        const embed = new EmbedBuilder()
            .setTitle("🔮 Horoscope du jour 🔮")
            .setDescription(horoscope)
            .setColor(0x8A2BE2)

        interaction.reply({ embeds: [embed.toJSON()] });
    }
}

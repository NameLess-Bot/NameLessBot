const { ApplicationCommandOptionType, EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const Permissions = require("../../PermissionENUM");

module.exports = {
    Integration: new SlashCommandBuilder()
        .setName("météo")
        .setDescription("Affiche la météo actuelle d'une ville 🌤️")
        .addStringOption(option =>
            option.setName("ville")
                .setDescription("La ville pour laquelle vous souhaitez connaître la météo")
                .setRequired(true)),

    Access: Permissions.Member,

    Code: async (interaction) => {
        const city = interaction.options.get("ville").value;

        try {
            const response = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`);
            const weather = await response.json();

            const currentCondition = weather.current_condition[0];
            const description = currentCondition.weatherDesc[0].value;
            const temp = currentCondition.temp_C;
            const feelsLike = currentCondition.FeelsLikeC;
            const humidity = currentCondition.humidity;
            const windSpeed = currentCondition.windspeedKmph;

            const embed = new EmbedBuilder()
                .setTitle(`🌤️ Météo à ${city} 🌤️`)
                .setDescription(`**${description}**\nTempérature: **${temp}°C**\nRessenti: **${feelsLike}°C**\nHumidité: **${humidity}%**\nVent: **${windSpeed} km/h**`)
                .setColor(0x1E90FF);

            interaction.reply({ embeds: [embed.toJSON()] });
        } catch (error) {
            interaction.reply("Désolé, je n'ai pas pu obtenir la météo pour cette ville. Veuillez vérifier le nom de la ville et réessayer.");
        }
    }
};

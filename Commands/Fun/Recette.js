const { ApplicationCommandOptionType, EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const Permissions = require("../../PermissionENUM");

module.exports = {
    Integration: new SlashCommandBuilder()
        .setName("recette")
        .setDescription("Affiche une recette aléatoire 🍽️"),

    Access: Permissions.Member,

    Code: async (interaction) => {
        try {
            const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
            const data = await response.json();
            const meal = data.meals[0];
            const title = meal.strMeal;
            const instructions = meal.strInstructions;
            const imageUrl = meal.strMealThumb;
            const recipeUrl = meal.strSource || `https://www.themealdb.com/meal/${meal.idMeal}`;

            const embed = new EmbedBuilder()
                .setTitle(`🍽️ Recette Aléatoire: ${title} 🍽️`)
                .setDescription(instructions.substring(0, 500) + '...')
                .setImage(imageUrl)
                .setURL(recipeUrl)
                .setColor(0xFF4500);

            interaction.reply({ embeds: [embed.toJSON()] });
        } catch (error) {
            interaction.reply("Désolé, je n'ai pas pu obtenir une recette. Veuillez réessayer plus tard.");
        }
    }
};

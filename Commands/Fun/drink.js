const { SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const Permissions = require('../../PermissionENUM');

module.exports = {
    Integration: new SlashCommandBuilder()
        .setName('drink')
        .setDescription('Search and display a cocktail recipe.')
        .addStringOption(option =>
            option.setName('cocktail')
                .setDescription('The name of the cocktail')
                .setRequired(true)),

    Access: Permissions.Member,

    Code: async (interaction) => {
        const cocktail = interaction.options.getString('cocktail');
        const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.drinks) {
                const drink = data.drinks[0];
                const ingredients = [];
                for (let i = 1; i <= 15; i++) {
                    if (drink[`strIngredient${i}`]) {
                        ingredients.push(`${drink[`strIngredient${i}`]} - ${drink[`strMeasure${i}`]}`);
                    }
                }

                const embed = new EmbedBuilder()
                    .setTitle(drink.strDrink)
                    .setDescription(drink.strInstructions)
                    .addFields({ name: 'Ingredients', value: ingredients.join('\n') })
                    .setImage(drink.strDrinkThumb)
                    .setColor(0x1E90FF);

                interaction.reply({ embeds: [embed] });
            } else {
                interaction.reply({ content: 'No cocktail found with that name.', ephemeral: true });
            }
        } catch (error) {
            console.error(error);
            interaction.reply({ content: 'An error occurred while fetching the cocktail recipe.', ephemeral: true });
        }
    }
};

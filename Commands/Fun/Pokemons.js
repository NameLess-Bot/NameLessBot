const { ApplicationCommandOptionType, EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const Permissions = require("../../PermissionENUM");

module.exports = {
    Integration: new SlashCommandBuilder()
        .setName("pokemon")
        .setDescription("Affiche un Pokémon aléatoire 🐱‍🏍"),

    Access: Permissions.Member,

    Code: async (interaction) => {
        try {
            const pokemonId = Math.floor(Math.random() * 898) + 1; // PokeAPI has 898 Pokémon
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
            const data = await response.json();
            const name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
            const imageUrl = data.sprites.front_default;

            const embed = new EmbedBuilder()
                .setTitle(`🐱‍🏍 Pokémon Aléatoire: ${name} 🐱‍🏍`)
                .setImage(imageUrl)
                .setColor(0xFF0000);

            interaction.reply({ embeds: [embed.toJSON()] });
        } catch (error) {
            interaction.reply("Désolé, je n'ai pas pu obtenir un Pokémon. Veuillez réessayer plus tard.");
        }
    }
};

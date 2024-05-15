const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Permissions = require("../../PermissionENUM");

module.exports = {
    Integration: new SlashCommandBuilder()
        .setName("define")
        .setDescription("Get the definition of a word.")
        .addStringOption(option =>
            option.setName('word')
                .setDescription('The word to define')
                .setRequired(true)),

    Access: Permissions.Member,

    Code: async (interaction) => {
        try {
            const word = interaction.options.getString('word');
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            const data = await response.json();

            if (data.title && data.title === "No Definitions Found") {
                return interaction.reply({ content: 'No definition found for this word.', ephemeral: true });
            }

            const definition = data[0].meanings[0].definitions[0].definition;

            const embed = new EmbedBuilder()
                .setTitle(`Definition of ${word}`)
                .setDescription(definition)
                .setColor(0x1E90FF)
                .setTimestamp(new Date());

            await interaction.reply({ embeds: [embed] });

        } catch (error) {
            console.log(`[!] Define.js : An error occurred.\n${error}`);
            interaction.reply({ content: 'An error occurred while processing your request. Please try again later.', ephemeral: true });
        }
    }
}

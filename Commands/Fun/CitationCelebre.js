const { ApplicationCommandOptionType, EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const Permissions = require("../../PermissionENUM");

module.exports = {
    Integration: new SlashCommandBuilder()
        .setName("citationcelebre")
        .setDescription("Affiche une citation célèbre ✨"),

    Access: Permissions.Member,

    Code: async (interaction) => {
        try {
            const response = await fetch('https://api.quotable.io/random');
            const data = await response.json();
            const quote = data.content;
            const author = data.author;

            const embed = new EmbedBuilder()
                .setTitle("✨ Citation ✨")
                .setDescription(`"${quote}"\n\n- ${author}`)
                .setColor(0x00FF00);

            interaction.reply({ embeds: [embed.toJSON()] });
        } catch (error) {
            interaction.reply("Désolé, je n'ai pas pu obtenir une citation. Veuillez réessayer plus tard.");
        }
    }
};

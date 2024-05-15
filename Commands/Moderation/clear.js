const { SlashCommandBuilder } = require("discord.js");
const Permissions = require("../../PermissionENUM");

module.exports = {
    Integration: new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Delete a specified number of messages.")
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('Number of messages to delete')
                .setRequired(true)),

    Access: Permissions.Admin,

    Code: async (interaction) => {
        const amount = interaction.options.getInteger('amount');

        if (amount < 1 || amount > 100) {
            return interaction.reply({ content: 'You need to input a number between 1 and 100.', ephemeral: true });
        }

        await interaction.channel.bulkDelete(amount, true).catch(err => {
            console.error(err);
            interaction.reply({ content: 'There was an error trying to prune messages in this channel!', ephemeral: true });
        });

        interaction.reply({ content: `Successfully deleted ${amount} messages.`, ephemeral: true });
    }
}

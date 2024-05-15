const { SlashCommandBuilder } = require("discord.js");
const Permissions = require("../../PermissionENUM");

module.exports = {
    Integration: new SlashCommandBuilder()
        .setName("slowmode")
        .setDescription("Set the slowmode interval for the channel.")
        .addIntegerOption(option =>
            option.setName('interval')
                .setDescription('Interval in seconds (0 to disable)')
                .setRequired(true)),

    Access: Permissions.Admin,

    Code: async (interaction) => {
        const interval = interaction.options.getInteger('interval');

        if (interval < 0 || interval > 21600) { // 6 hours is the maximum allowed slowmode interval
            return interaction.reply({ content: 'You need to input a number between 0 and 21600 seconds.', ephemeral: true });
        }

        interaction.channel.setRateLimitPerUser(interval)
            .then(() => {
                interaction.reply(`Slowmode is now set to ${interval} seconds.`);
            })
            .catch(err => {
                console.error(err);
                interaction.reply({ content: 'There was an error setting the slowmode in this channel!', ephemeral: true });
            });
    }
}

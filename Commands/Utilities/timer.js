const { ApplicationCommandOptionType, EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const { Intents } = require("../../Config");
const Config = require("../../Config");
const Permissions = require("../../PermissionENUM");

module.exports = {
    Integration: new SlashCommandBuilder()
        .setName("timer")
        .setDescription("Set a timer and ping someone when it's done!")
        .addIntegerOption(option =>
            option.setName('minutes')
                .setDescription('Number of minutes for the timer')
                .setRequired(true))
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User to ping when the timer ends')
                .setRequired(false)),

    Access: Permissions.Member,

    Code: async (interaction) => {
        try {
            const minutes = interaction.options.getInteger('minutes');
            const user = interaction.options.getUser('user') || interaction.user;

            if (minutes <= 0) {
                return interaction.reply({ content: 'Please provide a valid number of minutes greater than 0.', ephemeral: true });
            }

            const embed = new EmbedBuilder()
                .setTitle("Timer Set")
                .setDescription(`Timer set for ${minutes} minutes. I will ping ${user} when it's done!`)
                .setColor(0x00AE86)
                .setTimestamp(new Date())
                .setFooter({ text: `Timer ends at` });

            await interaction.reply({ embeds: [embed] });

            setTimeout(async () => {
                const endEmbed = new EmbedBuilder()
                    .setTitle("Timer Ended")
                    .setDescription(`The timer set by ${interaction.user} has ended!`)
                    .setColor(0x00AE86)
                    .setTimestamp(new Date());

                await interaction.followUp({ content: `${user}`, embeds: [endEmbed] });
            }, minutes * 60000); // Convert minutes to milliseconds
        } catch (error) {
            console.log(`[!] Timer.js : An error occurred.\n${error}`);
        }
    }
}

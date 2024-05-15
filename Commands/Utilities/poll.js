const { ApplicationCommandOptionType, EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require("discord.js");
const { Intents } = require("../../Config");
const Config = require("../../Config");
const Permissions = require("../../PermissionENUM");

module.exports = {
    Integration: new SlashCommandBuilder()
        .setName("poll")
        .setDescription("Create an interactive community poll!")
        .addStringOption(option =>
            option.setName('question')
                .setDescription('The question for the poll')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('option1')
                .setDescription('First poll option')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('option2')
                .setDescription('Second poll option')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('option3')
                .setDescription('Third poll option')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('option4')
                .setDescription('Fourth poll option')
                .setRequired(false)),

    Access: Permissions.Member,

    Code: async (interaction) => {
        try {
            const question = interaction.options.getString('question');
            const options = [
                interaction.options.getString('option1'),
                interaction.options.getString('option2'),
                interaction.options.getString('option3'),
                interaction.options.getString('option4')
            ].filter(option => option !== null);

            const votes = {};
            const userVotes = new Set();

            const embed = new EmbedBuilder()
                .setTitle("Community Poll")
                .setDescription(question)
                .setColor(0x00AE86);

            options.forEach((option, index) => {
                votes[index] = 0;
                embed.addFields({ name: option, value: '0 votes', inline: true });
            });

            const row = new ActionRowBuilder();
            options.forEach((option, index) => {
                row.addComponents(
                    new ButtonBuilder()
                        .setCustomId(`option${index}`)
                        .setLabel(option)
                        .setStyle(ButtonStyle.Primary)
                );
            });

            await interaction.reply({ embeds: [embed], components: [row] });

            const filter = i => i.user.id === interaction.user.id && i.customId.startsWith('option');
            const collector = interaction.channel.createMessageComponentCollector({ componentType: ComponentType.Button, time: 60000 });

            collector.on('collect', async i => {
                if (userVotes.has(i.user.id)) {
                    await i.reply({ content: 'You have already voted!', ephemeral: true });
                    return;
                }

                const optionIndex = parseInt(i.customId.replace('option', ''));
                votes[optionIndex]++;
                userVotes.add(i.user.id);

                const updatedEmbed = new EmbedBuilder()
                    .setTitle("Community Poll")
                    .setDescription(question)
                    .setColor(0x00AE86);

                options.forEach((option, index) => {
                    updatedEmbed.addFields({ name: option, value: `${votes[index]} votes`, inline: true });
                });

                await i.update({ embeds: [updatedEmbed], components: [row] });
            });

            collector.on('end', async () => {
                const finalEmbed = new EmbedBuilder()
                    .setTitle("Community Poll - Results")
                    .setDescription(question)
                    .setColor(0x00AE86);

                options.forEach((option, index) => {
                    finalEmbed.addFields({ name: option, value: `${votes[index]} votes`, inline: true });
                });

                await interaction.followUp({ embeds: [finalEmbed], components: [] });
            });
        } catch (error) {
            console.log(`[!] Poll.js : An error occurred.\n${error}`);
        }
    }
}

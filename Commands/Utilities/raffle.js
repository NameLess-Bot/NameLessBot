const { ApplicationCommandOptionType, EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require("discord.js");
const { Intents } = require("../../Config");
const Config = require("../../Config");
const Permissions = require("../../PermissionENUM");

module.exports = {
    Integration: new SlashCommandBuilder()
        .setName("raffle")
        .setDescription("Start a community raffle!")
        .addStringOption(option =>
            option.setName('enddate')
                .setDescription('The end date of the raffle (YYYY-MM-DD HH:MM)')
                .setRequired(true)),

    Access: Permissions.Member,

    Code: async (interaction) => {
        try {
            const endDateString = interaction.options.getString('enddate');
            const endDate = new Date(endDateString);

            if (isNaN(endDate)) {
                return interaction.reply({ content: 'Please provide a valid end date in the format YYYY-MM-DD HH:MM.', ephemeral: true });
            }

            const participants = new Set();

            const embed = new EmbedBuilder()
                .setTitle("Community Raffle")
                .setDescription(`Click the button below to participate in the raffle!\n\n**End Date:** ${endDate.toLocaleString()}`)
                .setColor(0x00AE86)
                .setTimestamp(endDate)
                .setFooter({ text: `Raffle ends at` });

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('join_raffle')
                        .setLabel('Join Raffle')
                        .setStyle(ButtonStyle.Primary)
                );

            await interaction.reply({ embeds: [embed], components: [row] });

            const filter = i => i.customId === 'join_raffle';
            const collector = interaction.channel.createMessageComponentCollector({ componentType: ComponentType.Button, time: endDate.getTime() - Date.now() });

            collector.on('collect', async i => {
                if (participants.has(i.user.id)) {
                    await i.reply({ content: 'You have already joined the raffle!', ephemeral: true });
                } else {
                    participants.add(i.user.id);
                    await i.reply({ content: 'You have successfully joined the raffle!', ephemeral: true });
                }
            });

            collector.on('end', async () => {
                let resultMessage;
                if (participants.size === 0) {
                    resultMessage = "No one joined the raffle. Better luck next time!";
                } else {
                    const winnerId = Array.from(participants)[Math.floor(Math.random() * participants.size)];
                    const winner = await interaction.guild.members.fetch(winnerId);
                    resultMessage = `The raffle has ended! Congratulations ${winner}, you are the winner!`;
                }

                const endEmbed = new EmbedBuilder()
                    .setTitle("Raffle Ended")
                    .setDescription(resultMessage)
                    .setColor(0x00AE86);

                await interaction.followUp({ content: resultMessage, embeds: [endEmbed], components: [] });
            });
        } catch (error) {
            console.log(`[!] Raffle.js : An error occurred.\n${error}`);
        }
    }
}

const { ApplicationCommandOptionType, EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { Intents } = require("../../Config");
const Config = require("../../Config");
const Permissions = require("../../PermissionENUM");

module.exports = {
    Integration: new SlashCommandBuilder()
        .setName("poker")
        .setDescription("Play a game of Poker Texas Hold'em!"),

    Access : Permissions.Member,

    Code: async (interaction) => {
        try {
            const cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
            const suits = ['♠', '♥', '♦', '♣'];

            const drawCard = () => {
                const card = cards[Math.floor(Math.random() * cards.length)];
                const suit = suits[Math.floor(Math.random() * suits.length)];
                return `${card}${suit}`;
            };

            const playerHand = [drawCard(), drawCard()];
            const communityCards = [drawCard(), drawCard(), drawCard(), drawCard(), drawCard()];

            const embed = new EmbedBuilder()
                .setTitle("Poker Texas Hold'em")
                .setDescription("Let's play a game of Poker Texas Hold'em!")
                .addFields(
                    { name: "Your hand", value: playerHand.join(", "), inline: true },
                    { name: "Community cards", value: "?", inline: true }
                )
                .setColor(0x00AE86);

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('check')
                        .setLabel('Check')
                        .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                        .setCustomId('raise')
                        .setLabel('Raise')
                        .setStyle(ButtonStyle.Success),
                    new ButtonBuilder()
                        .setCustomId('fold')
                        .setLabel('Fold')
                        .setStyle(ButtonStyle.Danger)
                );

            await interaction.reply({ embeds: [embed], components: [row] });

            const filter = i => i.user.id === interaction.user.id && ['check', 'raise', 'fold'].includes(i.customId);
            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

            let currentRound = 0;
            collector.on('collect', async i => {
                currentRound++;
                let action = i.customId;

                if (action === 'fold') {
                    collector.stop('fold');
                    return;
                }

                if (currentRound > 3) {
                    collector.stop('end');
                    return;
                }

                const embedUpdate = new EmbedBuilder()
                    .setTitle("Poker Texas Hold'em")
                    .setDescription("Let's play a game of Poker Texas Hold'em!")
                    .addFields(
                        { name: "Your hand", value: playerHand.join(", "), inline: true },
                        { name: "Community cards", value: communityCards.slice(0, currentRound + 2).join(", "), inline: true }
                    )
                    .setColor(0x00AE86);

                await i.update({ embeds: [embedUpdate] });
            });

            collector.on('end', async (collected, reason) => {
                let result;
                if (reason === 'fold') {
                    result = "You folded. Game over.";
                } else {
                    result = "Round over. Check the best hand!";
                }

                const finalEmbed = new EmbedBuilder()
                    .setTitle("Poker Texas Hold'em - Game Over")
                    .addFields(
                        { name: "Your hand", value: playerHand.join(", "), inline: true },
                        { name: "Community cards", value: communityCards.join(", "), inline: true },
                        { name: "Result", value: result, inline: true }
                    )
                    .setColor(0x00AE86);

                await interaction.followUp({ embeds: [finalEmbed], components: [] });
            });

        } catch (error) {
            console.log(`[!] Poker.js : An error occurred.\n${error}`);
        }
    }
}

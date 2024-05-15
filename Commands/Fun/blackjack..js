const { ApplicationCommandOptionType, EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { Intents } = require("../../Config");
const Config = require("../../Config");
const Permissions = require("../../PermissionENUM");

module.exports = {
    Integration: new SlashCommandBuilder()
        .setName("blackjack")
        .setDescription("Play a game of Blackjack!"),

    Access : Permissions.Member,

    Code: async (interaction) => {
        try {
            const cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
            const suits = ['♠', '♥', '♦', '♣'];

            const getCardValue = (card) => {
                if (['J', 'Q', 'K'].includes(card)) return 10;
                if (card === 'A') return 11;
                return parseInt(card);
            };

            const calculateScore = (hand) => {
                let score = hand.reduce((acc, card) => acc + getCardValue(card[0]), 0);
                let aces = hand.filter(card => card[0] === 'A').length;
                while (score > 21 && aces > 0) {
                    score -= 10;
                    aces -= 1;
                }
                return score;
            };

            const drawCard = () => {
                const card = cards[Math.floor(Math.random() * cards.length)];
                const suit = suits[Math.floor(Math.random() * suits.length)];
                return [card, suit];
            };

            const handToString = (hand) => hand.map(card => `${card[0]}${card[1]}`).join(", ");

            const playerHand = [drawCard(), drawCard()];
            const dealerHand = [drawCard(), drawCard()];

            let playerScore = calculateScore(playerHand);
            let dealerScore = calculateScore(dealerHand);

            const embed = new EmbedBuilder()
                .setTitle("Blackjack")
                .setDescription("Let's play a game of Blackjack!")
                .addFields(
                    { name: "Your cards", value: handToString(playerHand), inline: true },
                    { name: "Dealer's cards", value: `${dealerHand[0][0]}${dealerHand[0][1]}, ?`, inline: true },
                    { name: "Your score", value: playerScore.toString(), inline: true }
                )
                .setColor(0x00AE86);

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('hit')
                        .setLabel('Hit')
                        .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                        .setCustomId('stand')
                        .setLabel('Stand')
                        .setStyle(ButtonStyle.Secondary)
                );

            await interaction.reply({ embeds: [embed], components: [row] });

            const filter = i => i.user.id === interaction.user.id && ['hit', 'stand'].includes(i.customId);
            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

            collector.on('collect', async i => {
                if (i.customId === 'hit') {
                    playerHand.push(drawCard());
                    playerScore = calculateScore(playerHand);

                    const updatedEmbed = new EmbedBuilder()
                        .setTitle("Blackjack")
                        .setDescription("Let's play a game of Blackjack!")
                        .addFields(
                            { name: "Your cards", value: handToString(playerHand), inline: true },
                            { name: "Dealer's cards", value: `${dealerHand[0][0]}${dealerHand[0][1]}, ?`, inline: true },
                            { name: "Your score", value: playerScore.toString(), inline: true }
                        )
                        .setColor(0x00AE86);

                    await i.update({ embeds: [updatedEmbed] });

                    if (playerScore >= 21) {
                        collector.stop();
                    }
                } else if (i.customId === 'stand') {
                    collector.stop();
                }
            });

            collector.on('end', async () => {
                while (dealerScore < 17) {
                    dealerHand.push(drawCard());
                    dealerScore = calculateScore(dealerHand);
                }

                let result;
                if (playerScore > 21) {
                    result = "You bust! Dealer wins.";
                } else if (dealerScore > 21) {
                    result = "Dealer busts! You win.";
                } else if (playerScore > dealerScore) {
                    result = "You win!";
                } else if (playerScore < dealerScore) {
                    result = "Dealer wins.";
                } else {
                    result = "It's a tie!";
                }

                const finalEmbed = new EmbedBuilder()
                    .setTitle("Blackjack - Game Over")
                    .addFields(
                        { name: "Your cards", value: handToString(playerHand), inline: true },
                        { name: "Dealer's cards", value: handToString(dealerHand), inline: true },
                        { name: "Your score", value: playerScore.toString(), inline: true },
                        { name: "Dealer's score", value: dealerScore.toString(), inline: true },
                        { name: "Result", value: result, inline: true }
                    )
                    .setColor(0x00AE86);

                await interaction.followUp({ embeds: [finalEmbed], components: [] });
            });
        } catch (error) {
            console.log(`[!] Blackjack.js : An error occurred.\n${error}`);
        }
    }
}

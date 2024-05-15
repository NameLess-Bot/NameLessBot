const { ApplicationCommandOptionType, EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { Intents } = require("../../Config");
const Config = require("../../Config");
const Permissions = require("../../PermissionENUM");

module.exports = {
    Integration: new SlashCommandBuilder()
        .setName("bataille")
        .setDescription("Play a game of Bataille!"),

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

            const getCardValue = (card) => {
                const value = card.slice(0, -1);
                if (value === 'J') return 11;
                if (value === 'Q') return 12;
                if (value === 'K') return 13;
                if (value === 'A') return 14;
                return parseInt(value);
            };

            const playerCard = drawCard();
            const botCard = drawCard();

            const embed = new EmbedBuilder()
                .setTitle("Bataille")
                .setDescription("Let's play a game of Bataille!")
                .addFields(
                    { name: "Your card", value: playerCard, inline: true },
                    { name: "Bot's card", value: botCard, inline: true }
                )
                .setColor(0x00AE86);

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('play')
                        .setLabel('Play')
                        .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                        .setCustomId('end')
                        .setLabel('End')
                        .setStyle(ButtonStyle.Danger)
                );

            await interaction.reply({ embeds: [embed], components: [row] });

            const filter = i => i.user.id === interaction.user.id && ['play', 'end'].includes(i.customId);
            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

            collector.on('collect', async i => {
                if (i.customId === 'play') {
                    const playerNewCard = drawCard();
                    const botNewCard = drawCard();

                    const playerValue = getCardValue(playerNewCard);
                    const botValue = getCardValue(botNewCard);

                    let result;
                    if (playerValue > botValue) {
                        result = "You win!";
                    } else if (playerValue < botValue) {
                        result = "Bot wins!";
                    } else {
                        result = "It's a tie!";
                    }

                    const resultEmbed = new EmbedBuilder()
                        .setTitle("Bataille - Round Result")
                        .addFields(
                            { name: "Your card", value: playerNewCard, inline: true },
                            { name: "Bot's card", value: botNewCard, inline: true },
                            { name: "Result", value: result, inline: true }
                        )
                        .setColor(0x00AE86);

                    await i.update({ embeds: [resultEmbed] });

                    if (result !== "It's a tie!") {
                        collector.stop();
                    }
                } else if (i.customId === 'end') {
                    collector.stop();
                }
            });

            collector.on('end', async () => {
                const endEmbed = new EmbedBuilder()
                    .setTitle("Bataille - Game Over")
                    .setDescription("Thank you for playing Bataille!")
                    .setColor(0x00AE86);

                await interaction.followUp({ embeds: [endEmbed], components: [] });
            });
        } catch (error) {
            console.log(`[!] Bataille.js : An error occurred.\n${error}`);
        }
    }
}

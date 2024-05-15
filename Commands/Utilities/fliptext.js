const { SlashCommandBuilder } = require('discord.js');
const Permissions = require('../../PermissionENUM');

module.exports = {
    Integration: new SlashCommandBuilder()
        .setName('fliptext')
        .setDescription('Flip the text upside down.')
        .addStringOption(option =>
            option.setName('text')
                .setDescription('The text to flip')
                .setRequired(true)),

    Access: Permissions.Member,

    Code: async (interaction) => {
        const text = interaction.options.getString('text');
        const flippedText = text.split('').reverse().join('');
        interaction.reply({ content: flippedText });
    }
};

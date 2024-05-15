const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const Permissions = require('../../PermissionENUM');

module.exports = {
    Integration: new SlashCommandBuilder()
        .setName('qr')
        .setDescription('Generate a QR code for a text or link.')
        .addStringOption(option =>
            option.setName('text')
                .setDescription('The text or link to generate the QR code for')
                .setRequired(true)),

    Access: Permissions.Member,

    Code: async (interaction) => {
        const text = interaction.options.getString('text');
        const url = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(text)}&size=150x150`;

        const embed = new EmbedBuilder()
            .setTitle('QR Code')
            .setImage(url)
            .setColor(0x1E90FF);

        interaction.reply({ embeds: [embed] });
    }
};

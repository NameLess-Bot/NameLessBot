const { SlashCommandBuilder } = require("discord.js");
const Permissions = require("../../PermissionENUM");

module.exports = {
    Integration: new SlashCommandBuilder()
        .setName("info")
        .setDescription("Donne des informations sur le bot"),

    Access: Permissions.Member,

    Code: (interaction) => {
        const guild = interaction.guild;
        const guildName = guild.name;
        const guildMemberCount = guild.memberCount;
        interaction.reply(`This server is called ${guildName} and has ${guildMemberCount} members.`);
    }
}
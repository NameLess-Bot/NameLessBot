const { SlashCommandBuilder } = require("discord.js");
const Permissions = require("../../PermissionENUM");

module.exports = {
    Integration: new SlashCommandBuilder()
        .setName("invite")
        .setDescription("Create an invite link for the server."),

    Access: Permissions.Admin,

    Code: async (interaction) => {
        interaction.guild.invites.create(interaction.channel, { maxAge: 3600, maxUses: 1 })
            .then(invite => {
                interaction.reply(`Here is your invite link: ${invite.url}`);
            })
            .catch(err => {
                console.error(err);
                interaction.reply({ content: 'There was an error creating the invite link!', ephemeral: true });
            });
    }
}

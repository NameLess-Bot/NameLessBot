const { ApplicationCommandOptionType, EmbedBuilder, SlashCommandBuilder} = require("discord.js");
const {Intents} = require("../../Config");
const Config = require("../../Config");
const Permissions = require("../../PermissionENUM");
const {DB_CreateUpdate} = require("../../Modules/Database")

module.exports = {
    Integration: new SlashCommandBuilder()
        .setName("setuserpermissions")
        .setDescription("give a certain user a set level of permission.")
        .addUserOption(Option=>{
            return Option
                .setName("user")
                .setDescription("the user which is gonna get ranked.")
                .setRequired(true)
        })
        .addStringOption(option => {
            return option.setName('role')
                .setDescription('the role which will be given to the user')
                .setRequired(true)
                .addChoices(
                    { name: 'Admin', value: 'Administrator' },
                    { name: 'Moderator', value: 'Moderator' },
                    { name: 'Member', value: 'Member' },
          )}),

    Access : Permissions.Administrator,

    Code: async (interaction) => {
        try {
            const SelectedUser = interaction.options.get("user").user;
            const SelectedRole = interaction.options.get("role").value;

            if (Permissions[SelectedRole] == null) {
                const ErrorEmbed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle("Error : This permission level does not exist.")
                interaction.reply({embeds: [ErrorEmbed]})
                return
            } else {
                await DB_CreateUpdate(
                    "permissions",
                    {
                        userRoleId: parseInt(SelectedUser.id),
                        serverId: parseInt(interaction.guildId),
                    },
                    {
                        userRoleId: parseInt(SelectedUser.id),
                        type: 1,
                        permissionLevel: Permissions[SelectedRole],
                        serverId: parseInt(interaction.guildId),
                    },
                    {
                        permissionLevel: Permissions[SelectedRole],
                    },
                )

                const SuccessEmbed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle("Success : Role updated!")
                interaction.reply({embeds: [SuccessEmbed]})
            }
        }catch (error){
            console.log(`[!] SetUserPermission.js : An Error occured.\n${error}`)
        }
    }
}

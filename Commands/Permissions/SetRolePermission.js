const { ApplicationCommandOptionType, EmbedBuilder, SlashCommandBuilder} = require("discord.js");
const {Intents} = require("../../Config");
const Config = require("../../Config");
const Permissions = require("../../PermissionENUM");
const {DB_CreateUpdate} = require("../../Modules/Database");

module.exports = {
    Integration: new SlashCommandBuilder()
        .setName("setrolepermissions")
        .setDescription("Give a certain role a set level of permission.")
        .addRoleOption(Option=>{
            return Option
                .setName("role")
                .setDescription("the role which will be linked to a certain permission level.")
                .setRequired(true)
        })
        .addStringOption(option => {
            return option.setName('permissions')
                .setDescription('the permissions which will be given to the user')
                .setRequired(true)
                .addChoices(
                    { name: 'Admin', value: 'Administrator' },
                    { name: 'Moderator', value: 'Moderator' },
                    { name: 'Member', value: 'Member' },
                    )}),


    Access : Permissions.Administrator,

    Code: async (interaction) => {
        const SelectedRole = interaction.options.get("role").role;
        const SelectedPermissions = interaction.options.get("permissions").value;

        try{
            await DB_CreateUpdate(
                "permissions",
                {
                    userRoleId: parseInt(SelectedRole.id),
                    serverId: parseInt(interaction.guildId),
                },
                {
                    userRoleId: parseInt(SelectedRole.id),
                    type: 2,
                    permissionLevel: Permissions[SelectedPermissions],
                    serverId: parseInt(interaction.guildId),
                },
                {
                    permissionLevel: Permissions[SelectedPermissions],
                },
                )

            const SuccessEmbed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle("Success : Permissions updated!")
            interaction.reply({embeds: [SuccessEmbed]})
        }catch (error){
            console.log(`[!] SetRolePermission.js : An Error occured.\n${error}`)
        }
    }
}

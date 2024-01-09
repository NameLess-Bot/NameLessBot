const { ApplicationCommandOptionType, EmbedBuilder, SlashCommandBuilder} = require("discord.js");
const {Intents} = require("../../Config");
const Config = require("../../Config");
const Permissions = require("../../PermissionENUM");

module.exports = {
    Integration: new SlashCommandBuilder()
        .setName("setuserrole")
        .setDescription("give a certain user a set level of permission.")
        .addUserOption(Option=>{
            return Option
                .setName("user")
                .setDescription("the user which is gonna get ranked.")
                .setRequired(true)
        })
        .addStringOption(Option=> {
        return Option
            .setName("role")
            .setDescription("the bot permissions that will be given to said user.")
            .setRequired(true)
    }),

    Access : Permissions.Administrator,

    Code: async (interaction,Database) => {
        const SelectedUser = interaction.options.get("user").user;
        const SelectedRole = interaction.options.get("role").value;

        if (Permissions[SelectedRole] == null) {
            const ErrorEmbed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle("Error : This permission level does not exist.")
            interaction.reply({embeds: [ErrorEmbed]})
            return
        }else{
                Database.permissions.create({
                    data: {
                        id: parseInt(SelectedUser.id),
                        type: 1,
                        permissionLevel: Permissions[SelectedRole],
                        serverId: parseInt(interaction.guildId),
                    },
                })
                const SuccessEmbed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle("Success : Role updated!")
                interaction.reply({embeds: [SuccessEmbed]})
        }
    }
}

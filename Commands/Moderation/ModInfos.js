const {SlashCommandBuilder, EmbedBuilder} = require("discord.js");
const Permissions = require("../../PermissionENUM");
const {prisma} = require("../../Modules/Database");

module.exports = {
    Integration: new SlashCommandBuilder()
        .setName("modinfos")
        .setDescription("check the moderation history of a user")
        .addUserOption(Option=>{
            return Option
                .setName("user")
                .setDescription("the user to warn")
                .setRequired(true)
        }),

    Access : Permissions.Moderator,

    Code : async (interaction) => {
        const SelectedUser = interaction.options.get("user").user;

        let row = await prisma.CommandsData.findFirst({
            where: {
                userId: parseInt(SelectedUser.id),
                serverId: parseInt(interaction.guildId)
            },
        });

        if (row == null){
            row = {}
        }else{
            row = JSON.parse(row.data)
        }

        const SuccessEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle("This user doesn't have any moderation history.")

        if (row.Moderation == null){
            interaction.reply({embeds: [SuccessEmbed]})
        }else{
            interaction.reply(JSON.stringify(row))
        }
    }
}
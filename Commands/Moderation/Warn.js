const {SlashCommandBuilder, EmbedBuilder} = require("discord.js");
const Permissions = require("../../PermissionENUM");
const {prisma, DB_CreateUpdate} = require("../../Modules/Database");

module.exports = {
    Integration: new SlashCommandBuilder()
        .setName("warn")
        .setDescription("warn a user for their behavior.")
    .addUserOption(Option=>{
        return Option
            .setName("user")
            .setDescription("the user to warn")
            .setRequired(true)
    })
        .addStringOption(option => {
            return option.setName('reason')
                .setDescription('tell the user what he did wrong')
                .setRequired(true)
        }),

    Access : Permissions.Moderator,

    Code : async (interaction) => {
        const SelectedUser = interaction.options.get("user").user;
        const WarnReason = interaction.options.get("reason").value;

        let row = await prisma.CommandsData.findFirst({
            where: {
                userId: parseInt(SelectedUser.id),
                serverId: parseInt(interaction.guildId)
            },
        });
        if (row == null){
            row = {
                Moderation: {
                    Warns : [],
                }
            }
        }else{
            row = JSON.parse(row.data)
        }

        row.Moderation.Warns.push(WarnReason)

        await DB_CreateUpdate(
            "CommandsData",
            {
                userId: parseInt(SelectedUser.id),
                serverId: parseInt(interaction.guildId)
            },
            {
                userId: parseInt(SelectedUser.id),
                serverId: parseInt(interaction.guildId),
                data: JSON.stringify(row)
            },
            {
                data: JSON.stringify(row),
            }
        )

        const warnEmbed = new EmbedBuilder()
            .setColor('#FF0000')
            .setTitle(`Warning in ${interaction.guild.name}`)
            .setDescription(`You have been warned for: ${WarnReason}`)

        SelectedUser.send({embeds: [warnEmbed]})
            .then(() => {
                const SuccessEmbed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle("Success : Warned "+SelectedUser.username+" | "+row.Moderation.Warns.length+" warnings.")
                interaction.reply({embeds: [SuccessEmbed]})
            })
            .catch((error) => {
                const SuccessEmbed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle("Success : Warned "+SelectedUser.username+" | "+row.Moderation.Warns.length+" warnings. (DM Could not be sent)")
                interaction.reply({embeds: [SuccessEmbed]})
            });
    }
}
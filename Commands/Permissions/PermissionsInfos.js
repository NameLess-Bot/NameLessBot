const { ApplicationCommandOptionType, EmbedBuilder, SlashCommandBuilder} = require("discord.js");
const {Intents} = require("../../Config");
const Config = require("../../Config");
const Permissions = require("../../PermissionENUM");
const {DB_GetUserPermissionsByID} = require("../../Modules/Database")

module.exports = {
    Integration: new SlashCommandBuilder()
        .setName("userpermissions")
        .setDescription("Know your place in the NamelessBot Society"),

    Access : Permissions.Member,

    Code: async (interaction) => {
        try{
            let Permission = await DB_GetUserPermissionsByID(parseInt(interaction.user.id),parseInt(interaction.guildId))
            for (const [key, value] of Object.entries(Permissions)) {
                if (value == Permission){
                    Permission = key
                    break
                }
            }
            interaction.reply("Your current permissions are those of a ``"+Permission+"``.")
        }catch (error){
            console.log(`[!] PermissionsInfos.js : An Error occured.\n${error}`)
        }
    }
}

const { ApplicationCommandOptionType, EmbedBuilder, SlashCommandBuilder} = require("discord.js");
const {Intents} = require("../../Config");
const Config = require("../../Config");
const Permissions = require("../../PermissionENUM");

module.exports = {
    Integration: new SlashCommandBuilder()
        .setName("setrolepermissions")
        .setDescription("Give a certain role a set level of permission."),

    Access : Permissions.Administrator,

    Code: async (interaction) => {
    }
}

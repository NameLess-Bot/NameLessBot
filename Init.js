const { Client, Routes, REST, EmbedBuilder, PermissionsBitField } = require('discord.js');
const fs = require("fs")
const Config = require("./Config.js")
const { stat } = require("fs");
const { LoadCommandsFromDirectory } = require("./Modules/LoadCommands");
const { DB_GetUserPermissionsByID } = require('./Modules/Database');

// Load commands from the Commands directory
const Commands = LoadCommandsFromDirectory(process.cwd() + '\\' + "Commands")

// Create a new Discord client instance
const client = new Client({
    intents: Config.Intents
});

// When the client is ready, log a message to the console
client.on("ready", () => {
    console.log(`[*] Logged in as ${client.user.username}`);
    const UsedREST = new REST({ version: '10' }).setToken(Config.Token);

    const IntegrationProperties = Object.values(Commands).map(command => command.Integration);

    UsedREST.put(Routes.applicationCommands(client.user.id), { body: IntegrationProperties }).then(
        console.log(`[*] Rest successfully updated!`)
    )
})

// When an interaction (slash command, button click, etc.) is created
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.user.bot) return;

    const ChannelPermissions = interaction.channel.permissionsFor(interaction.client.user).toArray()
    const Member = interaction.member

    let BotPermissions = await DB_GetUserPermissionsByID(parseInt(interaction.user.id), parseInt(interaction.guildId))

    if (ChannelPermissions.includes("ViewChannel") && (BotPermissions >= Commands[interaction.commandName].Access || interaction.member.permissions.has(PermissionsBitField.Flags.Administrator))) {
        console.log(`[Command Executed] user ${interaction.user.username} executed command: ${interaction.commandName}`); // Console log de la commande exécutée
        Commands[interaction.commandName].Code(interaction)
    } else {
        const ErrorEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle("Error : Invalid permissions.")
        interaction.reply({ embeds: [ErrorEmbed] })
    }
});

// When the bot joins a new guild, log a message to the console
client.on("guildCreate", guild => {
    console.log(`[+] Joined : ${guild.name} (ID: ${guild.id})`);
});

// Login to Discord with the bot's token
client.login(Config.Token)
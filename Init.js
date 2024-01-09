const { Client, Routes,REST, EmbedBuilder,PermissionsBitField } = require('discord.js');
const fs = require("fs")
const Config = require("./Config.js")
const {stat} = require("fs");
const {LoadCommandsFromDirectory} = require("./Modules/LoadCommands");

const Commands = LoadCommandsFromDirectory(process.cwd()+'\\'+"Commands")

const client = new Client({
    intents: Config.Intents
});

client.on("ready",()=>{
    console.log(`[*] Logged in as ${client.user.username}`);
    UsedREST = new REST({ version: '10' }).setToken(Config.Token);

    const IntegrationProperties = Object.values(Commands).map(command => command.Integration);

    UsedREST.put(Routes.applicationCommands(client.user.id), { body: IntegrationProperties }).then(
        console.log(`[*] Rest successfully updated!`)
    )
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.user.bot) return;

    const ChannelPermissions = interaction.channel.permissionsFor(interaction.client.user).toArray()
    const Member = interaction.member
    console.log(Member.permissions.has(PermissionsBitField.Flags.Administrator))

    if (ChannelPermissions.includes("ViewChannel")) {
        Commands[interaction.commandName].Code(interaction)
    }else{
        const ErrorEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle("Error : view permissions.")
        interaction.reply({ embeds: [ErrorEmbed] })
    }
});

client.login(Config.Token)
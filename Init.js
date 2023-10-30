const { Client, Routes,REST } = require('discord.js');
const CommandsList = require("./CommandsList.js")
const Config = require("./Config.js")
let UsedREST = undefined;

const client = new Client({
    intents: Config.Intents
});

client.on("ready",()=>{
    console.log(`[*] Logged in as ${client.user.username}`);
    UsedREST = new REST({ version: '10' }).setToken(Config.Token);
    UsedREST.put(Routes.applicationCommands(client.user.id), { body: CommandsList }).then(
        console.log(`[*] Rest successfully updated!`)
    )
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.user.bot) return;

    switch (interaction.commandName){
        case "ping":
            await interaction.reply('pong');
            break;
        case "deez_what_sir":
            await interaction.reply('deez nuts!');
            break;
        case "say":
            await interaction.reply(interaction.options.get("message").value);
            break;
    }
});

client.login(Config.Token)

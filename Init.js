const { Client, Routes,REST } = require('discord.js');
const fs = require("fs")

const Config = require("./Config.js")
const path = require("path");

let UsedREST;
let Commands = {}
let CommandsShown = []

const client = new Client({
    intents: Config.Intents
});

client.on("ready",()=>{
    console.log(`[*] Logged in as ${client.user.username}`);
    UsedREST = new REST({ version: '10' }).setToken(Config.Token);
    UsedREST.put(Routes.applicationCommands(client.user.id), { body: CommandsShown }).then(
        console.log(`[*] Rest successfully updated!`)
    )
})
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.user.bot) return;

    Commands[interaction.commandName](interaction)
});

fs.readdir("./Commands", (err, files) => {
    if (err){
        console.log("[X] Invalid folder")
    }

    files.forEach(File =>{
        if (File.endsWith(".js")){
            const Data = require(`./Commands/${File}`)
            CommandsShown.push(Data.Integration)
            Commands[Data.Integration.name] = Data.Code
            console.log(`[*] Command ${Data.Integration.name} loaded!`)
        }
    })
});

client.login(Config.Token)
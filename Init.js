const { Client, Routes,REST } = require('discord.js');
const fs = require("fs")

const Config = require("./Config.js")
const {stat} = require("fs");

let UsedREST;
let Commands = {}
let CommandsShown = []

const client = new Client({
    intents: Config.Intents
});

function LoadCommandsFromDirectory(Directory){
    fs.readdir(Directory, (err, files) => {
        if (err){
            console.log("[X] Invalid folder")
            return
        }

        files.forEach(File =>{
            if (File.endsWith(".js")){
                const Data = require(`${Directory}/${File}`)
                CommandsShown.push(Data.Integration)
                Commands[Data.Integration.name] = Data.Code
                console.log(`[*] Command ${Data.Integration.name} loaded! ${Directory}`)
            }else{
                fs.stat(`${Directory}/${File}`, (err, stats) => {
                    if (stats.isDirectory()){
                        LoadCommandsFromDirectory(`${Directory}/${File}`)
                    }
                });
            }
        })
    });
}

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

LoadCommandsFromDirectory("./Commands")
client.login(Config.Token)
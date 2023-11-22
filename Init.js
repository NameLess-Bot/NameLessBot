const { Client, Routes, REST, EmbedBuilder } = require('discord.js');
const fs = require("fs")

const Config = require("./Config.js")
const { stat } = require("fs");
const prisma = require('./bd'); // Ajoutez cette ligne pour importer la configuration de la base de données

let UsedREST;
let Commands = {}
let CommandsShown = []

const client = new Client({
    intents: Config.Intents
});

function LoadCommandsFromDirectory(Directory) {
    const loadedCommands = []; // Tableau pour stocker les noms des commandes chargées

    fs.readdir(Directory, (err, files) => {
        if (err) {
            console.log("[X] Invalid folder");
            return;
        }

        files.forEach(File => {
            if (File.endsWith(".js")) {
                const Data = require(`${Directory}/${File}`);
                CommandsShown.push(Data.Integration);
                Commands[Data.Integration.name] = Data.Code;
                loadedCommands.push(Data.Integration.name); // Ajouter le nom de la commande au tableau
            } else {
                fs.stat(`${Directory}/${File}`, (err, stats) => {
                    if (stats.isDirectory()) {
                        LoadCommandsFromDirectory(`${Directory}/${File}`);
                    }
                });
            }
        });
        // Afficher tous les noms des commandes chargées dans un seul console.log
        console.log(`[*] Commands loaded: ${loadedCommands.join(', ')}`);
    });
}

client.on("ready", async () => {
    console.log(`[*] Logged in as ${client.user.username}`);


    // Exemple d'utilisation de Prisma
    try {
        const users = await prisma.Leo.findMany()
        console.log('Users from the database:', users)
    } catch (error) {
        console.error('Error fetching users from the database:', error);
    }

    UsedREST = new REST({ version: '10' }).setToken(Config.Token);
    UsedREST.put(Routes.applicationCommands(client.user.id), { body: CommandsShown }).then(
        console.log(`[*] Rest successfully updated!`)
    )
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.user.bot) return;

    const Permissions = interaction.channel.permissionsFor(interaction.client.user).toArray()

    if (Permissions.includes("ViewChannel")) {
        Commands[interaction.commandName](interaction)
    } else {
        const ErrorEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle("Error : view permissions.")
        interaction.reply({ embeds: [ErrorEmbed] })
    }
});

LoadCommandsFromDirectory("./Commands")
client.login(Config.Token)
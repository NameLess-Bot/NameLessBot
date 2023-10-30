const { Client, GatewayIntentBits, Routes,REST } = require('discord.js');

const TOKEN = "MTE2ODQ4NjE3ODUwNTM2MzQ5Ng.GIqT8Y.AyBNuTk9CLdIJ6BmQI6gvZMB8RxNYdIZMBygkw"
const CLIENT_ID = "1168486178505363496"

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
    ]
});

const commands = [
    {
        name: 'ping',
        description: 'Replies with Pong!',
    },
];

const rest = new REST({ version: '10' }).setToken(TOKEN);
rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

client.on("ready",()=>{
    console.log(`Logged in as ${client.user.id}!`);
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply('Tg');
    }
});

client.login("MTE2ODQ4NjE3ODUwNTM2MzQ5Ng.GIqT8Y.AyBNuTk9CLdIJ6BmQI6gvZMB8RxNYdIZMBygkw")

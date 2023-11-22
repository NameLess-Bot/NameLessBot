const { GatewayIntentBits } = require("discord.js");
const dotenv = require('dotenv');
// Chargez les variables d'environnement à partir du fichier .env
dotenv.config();

module.exports = {
    Token: process.env.TOKEN,
    RapidAPI_Key: process.env.RAPIDAPI_KEY,
    "Intents": [
        GatewayIntentBits.Guilds,
    ]
}
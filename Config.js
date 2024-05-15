const { GatewayIntentBits } = require("discord.js");
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    Token: process.env.TOKEN,
    RapidAPI_Key: process.env.RAPIDAPI_KEY,
    Db: process.env.DATABASE_URL,
    "Intents": [
        GatewayIntentBits.Guilds,
    ]
}
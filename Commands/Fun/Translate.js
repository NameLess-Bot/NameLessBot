const { ApplicationCommandOptionType, EmbedBuilder, SlashCommandBuilder} = require("discord.js");
const Config = require("../../Config");
const Permissions = require("../../PermissionENUM");

module.exports = {
    Integration: new SlashCommandBuilder()
        .setName("translate")
        .setDescription("Translate your messages using google translate's API!")
        .addStringOption(Option=>{
            return Option
                .setName("message")
                .setDescription("The message you want to translate.")
                .setRequired(true)
        })
        .addStringOption(Option=>{
            return Option
                .setName("src")
                .setDescription("The source language (Ex. FR/EN/RU/CN)")
                .setRequired(true)
        })
        .addStringOption(Option=>{
            return Option
                .setName("target")
                .setDescription("The target language. (Ex. FR/EN/RU/CN)")
                .setRequired(true)
        }),

        Access : Permissions.Member,

        Code : async (interaction) => {
            const message = interaction.options.get("message").value;
            const src = interaction.options.get("src").value;
            const target = interaction.options.get("target").value;

            const encodedParams = new URLSearchParams();
            encodedParams.set('text', message);
            encodedParams.set('target_language', target);
            encodedParams.set('source_language', src);

            try {
                const response = await fetch("https://text-translator2.p.rapidapi.com/translate", {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded',
                        'X-RapidAPI-Key': Config.RapidAPI_Key,
                        'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
                    },
                    body: encodedParams,
                });

                const data = await response.json();
                let allDataGathered = false;

                if ("data" in data) {
                    if ("translatedText" in data.data) {
                        allDataGathered = true;
                    }
                }

                if (!allDataGathered){
                    const ErrorEmbed = new EmbedBuilder()
                        .setColor(0x0099FF)
                        .setTitle("Invalid data Detected!")
                    interaction.reply({ embeds: [ErrorEmbed] })
                }else{
                    const translatedText = data.data.translatedText;

                    const embed = new EmbedBuilder()
                        .setTitle('<:GTranslate:1176828614835191849> Translate')
                        .setColor(0x93eeee)
                        .addFields(
                            {
                                name: `${src.toUpperCase()} : ${message}`,
                                value: `${target.toUpperCase()} : ${translatedText}`
                            }
                        );

                    interaction.reply({ embeds: [embed] })
                }

            } catch (error) {
                console.log(`[!] Translate.js : An Error occured.\n${error}`)
            }
        }
}

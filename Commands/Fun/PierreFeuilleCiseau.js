const { ApplicationCommandOptionType, EmbedBuilder, SlashCommandBuilder} = require("discord.js");
const Permissions = require("../../PermissionENUM");

const choices = ["pierre", "feuille", "ciseaux"];

module.exports = {
    Integration: new SlashCommandBuilder()
        .setName("pfc")
        .setDescription("Jouons à Pierre-Feuille-Ciseaux ✊✋✌️")
        .addStringOption(option =>
            option.setName("choix")
                .setDescription("Votre choix")
                .setRequired(true)
                .addChoices(
                    { name: "Pierre", value: "pierre" },
                    { name: "Feuille", value: "feuille" },
                    { name: "Ciseaux", value: "ciseaux" }
                )),

    Access: Permissions.Member,

    Code: (interaction) => {
        const userChoice = interaction.options.get("choix").value;
        const botChoice = choices[Math.floor(Math.random() * choices.length)];

        let result = "";

        if (userChoice === botChoice) {
            result = "C'est un match nul!";
        } else if (
            (userChoice === "pierre" && botChoice === "ciseaux") ||
            (userChoice === "feuille" && botChoice === "pierre") ||
            (userChoice === "ciseaux" && botChoice === "feuille")
        ) {
            result = "Félicitations, vous avez gagné!";
        } else {
            result = "Désolé, vous avez perdu.";
        }

        const embed = new EmbedBuilder()
            .setTitle("✊✋✌️ Pierre-Feuille-Ciseaux ✊✋✌️")
            .setDescription(`Votre choix: **${userChoice}**\nChoix du bot: **${botChoice}**\n\n${result}`)
            .setColor(0x00FFFF)

        interaction.reply({ embeds: [embed.toJSON()] });
    }
}

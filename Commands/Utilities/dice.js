const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Permissions = require("../../PermissionENUM");

const diceImages = {
    1: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Dice-1-b.svg',
    2: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Dice-2-b.svg',
    3: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Dice-3-b.svg',
    4: 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Dice-4-b.svg',
    5: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Dice-5-b.svg',
    6: 'https://upload.wikimedia.org/wikipedia/commons/2/26/Dice-6-b.svg'
};

module.exports = {
    Integration: new SlashCommandBuilder()
        .setName("roll")
        .setDescription("Roll a die and get a random number between 1 and 6 with an image!"),

    Access: Permissions.Member,

    Code: async (interaction) => {
        try {
            const rollResult = Math.floor(Math.random() * 6) + 1; // Génère un nombre aléatoire entre 1 et 6

            const embed = new EmbedBuilder()
                .setTitle("🎲 Dice Roll")
                .setDescription(`You rolled a ${rollResult}!`)
                .setImage(diceImages[rollResult])
                .setColor(0x00AE86);

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.log(`[!] Roll.js : An error occurred.\n${error}`);
        }
    }
}

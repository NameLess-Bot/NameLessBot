const { ApplicationCommandOptionType, EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const Permissions = require("../../PermissionENUM");

module.exports = {
    Integration: new SlashCommandBuilder()
        .setName("crypto")
        .setDescription("Affiche des informations sur une crypto-monnaie 🪙")
        .addStringOption(option =>
            option.setName("monnaie")
                .setDescription("Le nom de la crypto-monnaie (ex: bitcoin, ethereum)")
                .setRequired(true)),

    Access: Permissions.Member,

    Code: async (interaction) => {
        const coin = interaction.options.get("monnaie").value.toLowerCase();

        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coin}`);
            const data = await response.json();

            if (data.error) {
                return interaction.reply("Crypto-monnaie non trouvée.");
            }

            const embed = new EmbedBuilder()
                .setTitle(`🪙 Informations sur ${data.name} 🪙`)
                .setThumbnail(data.image.large)
                .addFields(
                    { name: 'Symbole', value: data.symbol.toUpperCase(), inline: true },
                    { name: 'Prix actuel', value: `$${data.market_data.current_price.usd}`, inline: true },
                    { name: 'Capitalisation boursière', value: `$${data.market_data.market_cap.usd.toLocaleString()}`, inline: true },
                    { name: 'Classement du marché', value: `#${data.market_data.market_cap_rank}`, inline: true },
                    { name: 'Site officiel', value: `[Lien](${data.links.homepage[0]})`, inline: true }
                )
                .setColor(0xFFD700);

            interaction.reply({ embeds: [embed.toJSON()] });
        } catch (error) {
            interaction.reply("Désolé, je n'ai pas pu obtenir les informations de la crypto-monnaie. Veuillez réessayer plus tard.");
        }
    }
};

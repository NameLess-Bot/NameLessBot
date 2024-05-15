const { ApplicationCommandOptionType, EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const Permissions = require("../../PermissionENUM");

module.exports = {
    Integration: new SlashCommandBuilder()
        .setName("github")
        .setDescription("Recherche un utilisateur GitHub 🐙")
        .addStringOption(option =>
            option.setName("utilisateur")
                .setDescription("Le nom d'utilisateur GitHub")
                .setRequired(true)),

    Access: Permissions.Member,

    Code: async (interaction) => {
        const username = interaction.options.get("utilisateur").value;

        try {
            const response = await fetch(`https://api.github.com/users/${username}`);
            const data = await response.json();

            if (data.message === "Not Found") {
                return interaction.reply("Utilisateur GitHub non trouvé.");
            }

            const embed = new EmbedBuilder()
                .setTitle(`🐙 Profil GitHub de ${data.login} 🐙`)
                .setURL(data.html_url)
                .setThumbnail(data.avatar_url)
                .addFields(
                    { name: 'Nom', value: data.name || 'N/A', inline: true },
                    { name: 'Bio', value: data.bio || 'N/A', inline: true },
                    { name: 'Public Repos', value: data.public_repos.toString(), inline: true },
                    { name: 'Followers', value: data.followers.toString(), inline: true },
                    { name: 'Following', value: data.following.toString(), inline: true }
                )
                .setColor(0x24292e);

            interaction.reply({ embeds: [embed.toJSON()] });
        } catch (error) {
            interaction.reply("Désolé, je n'ai pas pu obtenir les informations de l'utilisateur GitHub. Veuillez réessayer plus tard.");
        }
    }
};

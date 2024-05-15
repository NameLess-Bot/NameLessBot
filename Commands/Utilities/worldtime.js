const { ApplicationCommandOptionType, EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { Intents } = require("../../Config");
const Config = require("../../Config");
const Permissions = require("../../PermissionENUM");

const regions = {
    "Americas": ["America/New_York", "America/Los_Angeles", "America/Sao_Paulo"],
    "Europe": ["Europe/London", "Europe/Paris", "Europe/Moscow"],
    "Asia": ["Asia/Tokyo", "Asia/Shanghai", "Asia/Dubai"],
    "Africa": ["Africa/Johannesburg", "Africa/Cairo", "Africa/Lagos"],
    "Oceania": ["Australia/Sydney", "Pacific/Auckland", "Pacific/Honolulu"]
};

const regionNames = {
    "America/New_York": "New York, USA",
    "America/Los_Angeles": "Los Angeles, USA",
    "America/Sao_Paulo": "São Paulo, Brazil",
    "Europe/London": "London, UK",
    "Europe/Paris": "Paris, France",
    "Europe/Moscow": "Moscow, Russia",
    "Asia/Tokyo": "Tokyo, Japan",
    "Asia/Shanghai": "Shanghai, China",
    "Asia/Dubai": "Dubai, UAE",
    "Africa/Johannesburg": "Johannesburg, South Africa",
    "Africa/Cairo": "Cairo, Egypt",
    "Africa/Lagos": "Lagos, Nigeria",
    "Australia/Sydney": "Sydney, Australia",
    "Pacific/Auckland": "Auckland, New Zealand",
    "Pacific/Honolulu": "Honolulu, Hawaii"
};

module.exports = {
    Integration: new SlashCommandBuilder()
        .setName("worldtime")
        .setDescription("Get the current time in various regions of the world!"),

    Access: Permissions.Member,

    Code: async (interaction) => {
        try {
            const createRegionRow = () => {
                return new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('americas')
                            .setLabel('Americas')
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setCustomId('europe')
                            .setLabel('Europe')
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setCustomId('asia')
                            .setLabel('Asia')
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setCustomId('africa')
                            .setLabel('Africa')
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setCustomId('oceania')
                            .setLabel('Oceania')
                            .setStyle(ButtonStyle.Primary)
                    );
            };

            const initialEmbed = new EmbedBuilder()
                .setTitle("World Time")
                .setDescription("Select a region to view the current time in various cities.")
                .setColor(0x00AE86);

            await interaction.reply({ embeds: [initialEmbed], components: [createRegionRow()] });

            const filter = i => i.user.id === interaction.user.id && Object.keys(regions).map(key => key.toLowerCase()).includes(i.customId);
            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

            collector.on('collect', async i => {
                const region = i.customId.charAt(0).toUpperCase() + i.customId.slice(1);
                const timeEmbed = new EmbedBuilder()
                    .setTitle(`Current Time in ${region}`)
                    .setColor(0x00AE86);

                const timeData = regions[region].map(timezone => {
                    const time = new Date().toLocaleString("en-US", { timeZone: timezone });
                    return { name: regionNames[timezone], value: time, inline: true };
                });

                timeEmbed.addFields(timeData);

                await i.update({ embeds: [timeEmbed], components: [createRegionRow()] });
            });

            collector.on('end', async () => {
                const endEmbed = new EmbedBuilder()
                    .setTitle("World Time - Session Ended")
                    .setDescription("Thank you for using the world time command!")
                    .setColor(0x00AE86);

                await interaction.editReply({ embeds: [endEmbed], components: [] });
            });
        } catch (error) {
            console.log(`[!] WorldTime.js : An error occurred.\n${error}`);
        }
    }
}

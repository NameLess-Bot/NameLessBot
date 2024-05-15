const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Permissions = require("../../PermissionENUM");

const currencies = [
    { name: 'USD', description: 'US Dollar' },
    { name: 'EUR', description: 'Euro' },
    { name: 'GBP', description: 'British Pound' },
    { name: 'JPY', description: 'Japanese Yen' },
    { name: 'AUD', description: 'Australian Dollar' },
    { name: 'CAD', description: 'Canadian Dollar' },
    { name: 'CHF', description: 'Swiss Franc' },
    { name: 'CNY', description: 'Chinese Yuan' },
    { name: 'SEK', description: 'Swedish Krona' },
    { name: 'NZD', description: 'New Zealand Dollar' }
];

module.exports = {
    Integration: new SlashCommandBuilder()
        .setName("convert")
        .setDescription("Convert currency from one to another.")
        .addNumberOption(option =>
            option.setName('amount')
                .setDescription('Amount to convert')
                .setRequired(true))
        .addStringOption(option => {
            let opt = option.setName('from')
                .setDescription('Currency to convert from')
                .setRequired(true);
            currencies.forEach(currency => opt.addChoices({ name: currency.name, value: currency.name }));
            return opt;
        })
        .addStringOption(option => {
            let opt = option.setName('to')
                .setDescription('Currency to convert to')
                .setRequired(true);
            currencies.forEach(currency => opt.addChoices({ name: currency.name, value: currency.name }));
            return opt;
        }),

    Access: Permissions.Member,

    Code: async (interaction) => {
        try {
            const amount = interaction.options.getNumber('amount');
            const from = interaction.options.getString('from').toUpperCase();
            const to = interaction.options.getString('to').toUpperCase();

            // Fetch exchange rate data
            const response = await fetch(`https://v6.exchangerate-api.com/v6/30ee26d779e7bf51d944c4b0/latest/${from}`);
            const data = await response.json();

            if (data.result === "error") {
                return interaction.reply({ content: 'Error fetching exchange rate data. Please check the currency codes and try again.', ephemeral: true });
            }

            const rate = data.conversion_rates[to];
            if (!rate) {
                return interaction.reply({ content: `Unable to convert ${from} to ${to}. Please check the currency codes and try again.`, ephemeral: true });
            }

            const convertedAmount = amount * rate;

            const embed = new EmbedBuilder()
                .setTitle("💱 Currency Conversion")
                .setDescription(`Conversion from ${from} to ${to}`)
                .addFields(
                    { name: "Amount", value: `${amount} ${from}`, inline: true },
                    { name: "Converted Amount", value: `${convertedAmount.toFixed(2)} ${to}`, inline: true },
                    { name: "Exchange Rate", value: `1 ${from} = ${rate} ${to}`, inline: true }
                )
                .setColor(0x00AE86)
                .setFooter({ text: 'Exchange Rate provided by exchangerate-api.com', iconURL: 'https://exchangerate-api.com/favicon.ico' })
                .setTimestamp(new Date());

            await interaction.reply({ embeds: [embed] });

        } catch (error) {
            console.log(`[!] Convert.js : An error occurred.\n${error}`);
            interaction.reply({ content: 'An error occurred while processing your request. Please try again later.', ephemeral: true });
        }
    }
}

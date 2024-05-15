const { SlashCommandBuilder } = require('discord.js');
const Permissions = require('../../PermissionENUM');

module.exports = {
    Integration: new SlashCommandBuilder()
        .setName('bmi')
        .setDescription('Calculate Body Mass Index (BMI).')
        .addNumberOption(option =>
            option.setName('weight')
                .setDescription('Weight in kilograms')
                .setRequired(true))
        .addNumberOption(option =>
            option.setName('height')
                .setDescription('Height in meters')
                .setRequired(true)),

    Access: Permissions.Member,

    Code: async (interaction) => {
        const weight = interaction.options.getNumber('weight');
        const height = interaction.options.getNumber('height');

        if (weight <= 0 || height <= 0) {
            return interaction.reply({ content: 'Weight and height must be positive numbers.', ephemeral: true });
        }

        const bmi = weight / (height * height);
        let category = '';

        if (bmi < 16) {
            category = 'Severe Thinness';
        } else if (bmi >= 16 && bmi < 17) {
            category = 'Moderate Thinness';
        } else if (bmi >= 17 && bmi < 18.5) {
            category = 'Mild Thinness';
        } else if (bmi >= 18.5 && bmi < 25) {
            category = 'Normal';
        } else if (bmi >= 25 && bmi < 30) {
            category = 'Overweight';
        } else if (bmi >= 30 && bmi < 35) {
            category = 'Obese Class I (Moderate)';
        } else if (bmi >= 35 && bmi < 40) {
            category = 'Obese Class II (Severe)';
        } else {
            category = 'Obese Class III (Very severe or morbidly obese)';
        }

        interaction.reply({ content: `Your BMI is \`${bmi.toFixed(2)}\`. You are classified as \`${category}\`.` });
    }
};

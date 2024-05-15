const { SlashCommandBuilder } = require('discord.js');
const math = require('mathjs');
const Permissions = require('../../PermissionENUM');

module.exports = {
    Integration: new SlashCommandBuilder()
        .setName('math')
        .setDescription('Solve a mathematical equation.')
        .addStringOption(option =>
            option.setName('equation')
                .setDescription('The equation to solve')
                .setRequired(true)),

    Access: Permissions.Member,

    Code: async (interaction) => {
        const equation = interaction.options.getString('equation');

        try {
            const result = math.evaluate(equation);
            interaction.reply({ content: `The result of \`${equation}\` is \`${result}\`.` });
        } catch (error) {
            console.error(error);
            interaction.reply({ content: 'An error occurred while solving the equation. Please make sure it is a valid equation.', ephemeral: true });
        }
    }
};

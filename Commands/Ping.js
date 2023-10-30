module.exports = {
    Integration: {
        name: 'ping',
        description: 'pong!',
    },

    Code : (interaction) => {
        interaction.reply("pong!")
    }
}
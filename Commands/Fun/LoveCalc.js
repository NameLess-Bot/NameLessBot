const { ApplicationCommandOptionType, EmbedBuilder, SlashCommandBuilder} = require("discord.js");
const {Intents} = require("../../Config");

const HighLove = [
    "Wow! 💖 User1 and User2 are head over heels in love with each other, scoring an incredible X% on the love scale! 🚀",
    "The love meter is off the charts! User1 and User2 are rocking a phenomenal X% love connection! 😍",
    "It's a love explosion! X% says that User1 and User2 are deeply, madly in love! 💑",
    "Cupid's arrows have hit bullseye! User1 and User2 are proudly flaunting a sky-high X% on the love-o-meter! 💘",
    "Hold on to your hearts! X% reveals that User1 and User2 are on a love rollercoaster, and it's going straight up! 🎢❤️",
]

const LowLove = [
    "Looks like there's room for a little more spark! User1 and User2 scored X% on the love meter, but there's always room to grow! 💔",
    "No need to worry, love is a journey! X% suggests that User1 and User2 might want to sprinkle a bit more love dust into their relationship. 💭",
    "The love percentage for User1 and User2 is X%, indicating there's potential for more sparks to fly. Keep nurturing that connection! ⚡",
    "Love is a work in progress! User1 and User2 have a X% love score, a good starting point for building something beautiful! 💬",
    "A bit of room for improvement! X% suggests that there's potential for User1 and User2 to explore and deepen their connection. 💕"
]

module.exports = {
    Integration: new SlashCommandBuilder()
        .setName("lovecalc")
        .setDescription("Shows the compatibility between two persons 😳")
        .addStringOption(Option=>{
            return Option
                .setName("name1")
                .setDescription("a")
                .setRequired(true)
        })
        .addStringOption(Option=>{
            return Option
                .setName("name2")
                .setDescription("b")
                .setRequired(true)
        }),

        Code: (interaction) => {
            const lovePercentage = Math.floor(Math.random() * (100));

            const name1 = interaction.options.get("name1").value;
            const name2 = interaction.options.get("name2").value;

            let SelectedSetence = "";

            if (lovePercentage > 50){
                SelectedSetence = HighLove[Math.floor(Math.random() * (HighLove.length))]
            }else{
                SelectedSetence = LowLove[Math.floor(Math.random() * (LowLove.length))]
            }

            SelectedSetence = SelectedSetence.replace("X%", lovePercentage + "%");
            SelectedSetence = SelectedSetence.replace("User1", name1);
            SelectedSetence = SelectedSetence.replace("User2", name2);

            interaction.reply(SelectedSetence)
        }
}

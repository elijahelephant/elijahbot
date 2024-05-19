const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    category: 'fun',
    data: new SlashCommandBuilder()
        .setName('magic8ball')
        .setDescription('Ask the Magic 8-Ball a question.')
        .addStringOption(option => 
            option.setName('question')
                .setDescription('Your question for the Magic 8-Ball')
                .setRequired(true)),
    async execute(interaction) {
        const answers = [
            "It is certain.",
            "It is decidedly so.",
            "Without a doubt.",
            "Yes – definitely.",
            "You may rely on it.",
            "As I see it, yes.",
            "Most likely.",
            "Outlook good.",
            "Yes.",
            "Signs point to yes.",
            "Reply hazy, try again.",
            "Ask again later.",
            "Better not tell you now.",
            "Cannot predict now.",
            "Concentrate and ask again.",
            "Don't count on it.",
            "My reply is no.",
            "My sources say no.",
            "Outlook not so good.",
            "Very doubtful."
        ];

        const question = interaction.options.getString('question');
        const answer = answers[Math.floor(Math.random() * answers.length)];

        const responseEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Magic 8-Ball')
            .addFields(
                { name: 'Question', value: question },
                { name: 'Answer', value: answer }
            );

        await interaction.reply({ embeds: [responseEmbed] });
    },
};

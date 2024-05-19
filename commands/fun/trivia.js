const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');
const he = require('he'); // To decode HTML entities

module.exports = {
    category: 'fun',
    data: new SlashCommandBuilder()
        .setName('trivia')
        .setDescription('Fetches a random trivia question.'),
    async execute(interaction) {
        try {
            const response = await fetch("https://opentdb.com/api.php?amount=1&type=multiple");
            const data = await response.json();
            const question = data.results[0];

            const options = [...question.incorrect_answers, question.correct_answer];
            options.sort(() => Math.random() - 0.5);

            const decodedQuestion = he.decode(question.question); // Decode HTML entities
            const decodedOptions = options.map(opt => he.decode(opt)); // Decode HTML entities

            const embed = new EmbedBuilder()
                .setTitle('Trivia Question')
                .setDescription(`${decodedQuestion}\n\n${decodedOptions.map((opt, index) => `${index + 1}. ${opt}`).join('\n')}`)
                .setColor(0x00AE86);

            await interaction.reply({ embeds: [embed] });

            // Collect the user's answer
            const filter = response => response.author.id === interaction.user.id;
            const collector = interaction.channel.createMessageCollector({ filter, time: 15000, max: 1 });

            collector.on('collect', async (response) => {
                const userAnswer = response.content.toLowerCase().trim();
                const correctAnswer = he.decode(question.correct_answer).toLowerCase().trim();

                console.log(`User Answer: ${userAnswer}`);
                console.log(`Correct Answer: ${correctAnswer}`);
                console.log(`Options: ${JSON.stringify(decodedOptions)}`);

                // Check if the user answered with the correct option text or the correct number
                const answerIsCorrect = decodedOptions.some((opt, index) => 
                    opt.toLowerCase().trim() === userAnswer ||
                    (index + 1).toString() === userAnswer
                );

                if (answerIsCorrect) {
                    await response.reply('Correct!');
                } else {
                    await response.reply(`Wrong! The correct answer was ${question.correct_answer}`);
                }
            });

            collector.on('end', async collected => {
                if (collected.size === 0) {
                    await interaction.followUp('Time is up! No one answered the question.');
                }
            });
        } catch (error) {
            console.error('Error fetching trivia question:', error);
            await interaction.reply('Failed to fetch trivia question.');
        }
    },
};

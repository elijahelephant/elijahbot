const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    category: 'fun',
    data: new SlashCommandBuilder()
        .setName('joke')
        .setDescription('Provides a random joke.'),
    async execute(interaction) {
        try {
            // Fetching a joke from the JokeAPI
            const response = await fetch('https://v2.jokeapi.dev/joke/Any?type=single&blacklistFlags=nsfw,religious,political,racist,sexist');
            const jokeData = await response.json();

            // Check if the joke was successfully retrieved
            if (jokeData.error) {
                await interaction.reply('Failed to fetch a joke, please try again later!');
                return;
            }

            // Prepare the joke in an embed
            const jokeEmbed = new EmbedBuilder()
                .setColor(0x0099FF) // You can choose any color you like
                .setTitle('Here\'s Your Joke')
                .setDescription(jokeData.joke) // Assuming the API returns a joke in the 'joke' field
                .setFooter({ text: 'Hope that tickles your funny bone!' });

            // Send the embed to the channel
            await interaction.reply({ embeds: [jokeEmbed] });
        } catch (error) {
            console.error('Error fetching joke:', error);
            await interaction.reply('An error occurred while fetching a joke. Please try again later.');
        }
    },
};

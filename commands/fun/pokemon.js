const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    category: 'entertainment',
    data: new SlashCommandBuilder()
        .setName('pokemon')
        .setDescription('Fetches information about a specified Pokémon.')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('Enter the Pokémon name')
                .setRequired(true)),
    async execute(interaction) {
        const name = interaction.options.getString('name').toLowerCase();

        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            const data = await response.json();

            const embed = new EmbedBuilder()
                .setTitle(data.name.charAt(0).toUpperCase() + data.name.slice(1))
                .setDescription(`Type: ${data.types.map(type => type.type.name).join(', ')}`)
                .addFields(
                    { name: 'Height', value: `${data.height / 10} m`, inline: true },
                    { name: 'Weight', value: `${data.weight / 10} kg`, inline: true }
                )
                .setThumbnail(data.sprites.front_default)
                .setColor(0xFF0000);

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error fetching Pokémon data:', error);
            await interaction.reply('Failed to fetch Pokémon data.');
        }
    },
};

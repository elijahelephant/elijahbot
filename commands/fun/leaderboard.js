const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    category: 'utility',
    data: new SlashCommandBuilder()
        .setName('leaderboard')
        .setDescription('Displays the leaderboard.'),
    async execute(interaction) {
        const points = JSON.parse(fs.readFileSync('./points.json', 'utf8'));

        const sortedUsers = Object.keys(points).sort((a, b) => points[b] - points[a]);
        const topUsers = sortedUsers.slice(0, 10); // Get the top 10 users

        const embed = new EmbedBuilder()
            .setTitle('Leaderboard')
            .setColor(0x00AE86);

        topUsers.forEach((userId, index) => {
            embed.addFields({ name: `${index + 1}. ${interaction.client.users.cache.get(userId).tag}`, value: `${points[userId]} points`, inline: true });
        });

        await interaction.reply({ embeds: [embed] });
    },
};

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	category: 'utility',
	data: new SlashCommandBuilder()
		.setName('preciousking')
		.setDescription('Provides an image of Brent.'),
	async execute(interaction) {
		await interaction.reply({ files: ['IMG_4503.jpg'] });
	},
};

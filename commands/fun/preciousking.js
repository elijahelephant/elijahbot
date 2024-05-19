const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	category: 'utility',
	data: new SlashCommandBuilder()
		.setName('preciousking')
		.setDescription('Provides a random image of Brent.'),
	async execute(interaction) {
		const images = ['assets/IMG_4503.jpg', 'assets/IMG_0156.jpg', 'assetsIMG_1594.jpg'];
		const randomIndex = Math.floor(Math.random() * images.length);
		const randomImage = images[randomIndex];
		await interaction.reply({ files: [randomImage] });
	},
};

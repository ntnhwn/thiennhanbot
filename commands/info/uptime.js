const { EmbedBuilder } = require('discord.js');
const prettyMs = require('pretty-ms');

module.exports = {
  name: 'uptime',
  description: 'Hiển thị thời gian bot đã hoạt động',
  options: [],
  execute: async (interaction, client) => {
    try {
      // Thời gian bot đã chạy (ms)
      const uptimeMs = process.uptime() * 1000;
      const uptimeFormatted = prettyMs(uptimeMs, {
        verbose: true,
        secondsDecimalDigits: 0
      });

      // Thời gian bot khởi động
      const startTime = new Date(Date.now() - uptimeMs)
        .toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });

      // Tạo embed
      const embed = new EmbedBuilder()
        .setColor('#00FF7F')
        .setAuthor({
          name: `${client.user.username} - Uptime`,
          iconURL: client.user.displayAvatarURL()
        })
        .addFields(
          { name: '⏱ Đã hoạt động', value: `\`\`\`${uptimeFormatted}\`\`\``, inline: false },
          { name: '🕒 Khởi động lúc', value: `\`\`\`${startTime}\`\`\``, inline: false }
        )
        .setFooter({
          text: `Yêu cầu bởi ${interaction.user.username}`,
          iconURL: interaction.user.displayAvatarURL()
        })
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });

    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: '❌ Đã xảy ra lỗi khi lấy thời gian uptime!',
        ephemeral: true
      });
    }
  },
};

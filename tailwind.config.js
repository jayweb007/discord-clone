module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        discord_blue: "#295DE7",
        discord_blurple: "#7289da",
        discord_purple: "#5865f2",
        discord_green: "#3ba55c",
        discord_serverbg: "#36393f",
        discord_serversBg: "#202225",
        discord_channelsBg: "#2f3136",
        discord_serverNameHoverBg: "#34373c",
        discord_channel: "#8e9297",
        discord_channelsHoverBg: "#3a3c43",
        discord_userId: "#b9bbbe",
        discord_iconHoverBg: "#3a3c43",
        discord_userSectionBg: "#292b2f",
        discord_iconHover: "#dcddde",
        discord_chatHeaderIcon: "#72767d",
        discord_chatInputBg: "#40444b",
        discord_messageBg: "#32353b",
      },
      height: {
        vh83: "83vh",
      },
    },
  },
  variants: {
    extend: {
      animation: ["motion-safe"],
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};

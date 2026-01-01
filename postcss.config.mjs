const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

module.exports = {
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        border: "var(--color-border)",
        primary: "var(--color-primary)",
        text: "var(--color-text)"
      }
    }
  }
};


export default config;

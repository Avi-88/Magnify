const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'cabin-back': "url('/cabin1.jpg')",
        'beach-back':"url('/beach1.jpg')",
        'forest-back':"url('/forest1.jpg')",
        'rain-back':"url('/rain.jpg')",
        'zen-back':"url('/zen.jpg')",
        'maze-back':"url('/maze.jpg')"
      }
    },
    screens: {
      'sml': '640px',
      // => @media (min-width: 640px) { ... }

      'mid': '980px',
      // => @media (min-width: 1024px) { ... }

      'lar': '1240px',
      // => @media (min-width: 1280px) { ... }

      'xLar': '1320px',
    },
    fontFamily: {
      'kumbh':['Kumbh Sans', 'sans-serif']
    }
  },
  plugins: [
    plugin(function ({ addVariant, e, postcss }) {
      addVariant('firefox', ({ container, separator }) => {
        const isFirefoxRule = postcss.atRule({
          name: '-moz-document',
          params: 'url-prefix()',
        });
        isFirefoxRule.append(container.nodes);
        container.append(isFirefoxRule);
        isFirefoxRule.walkRules((rule) => {
          rule.selector = `.${e(
            `firefox${separator}${rule.selector.slice(1)}`
          )}`;
        });
      });
    }),
  ],
}

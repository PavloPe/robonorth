/**
 * PostCSS plugin to strip @supports blocks that upgrade CSS custom properties
 * from rgb() to oklch()/oklab()/display-p3.
 */
const plugin = () => {
  return {
    postcssPlugin: 'postcss-strip-oklch-supports',
    AtRule: {
      supports(atRule) {
        const params = atRule.params;
        if (
          params.includes('oklab(') ||
          params.includes('oklch(') ||
          params.includes('display-p3')
        ) {
          atRule.remove();
        }
      }
    }
  };
};
plugin.postcss = true;

module.exports = plugin;

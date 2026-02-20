/**
 * PostCSS plugin to strip @supports blocks that upgrade CSS custom properties
 * from rgb() to oklch()/oklab()/display-p3.
 * 
 * Tailwind CSS v4 generates rgb fallbacks in :root, then overrides with oklch
 * inside @supports (color: oklab(...)). Older browsers (Chrome < 111) may claim
 * oklab support but fail to render oklch in custom properties, causing broken colors.
 * 
 * This plugin removes those @supports blocks so only rgb fallbacks remain.
 */
const plugin = () => {
  return {
    postcssPlugin: 'postcss-strip-oklch-supports',
    AtRule: {
      supports(atRule) {
        const params = atRule.params;
        // Strip @supports blocks that check for oklab or display-p3
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

export default plugin;

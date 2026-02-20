/**
 * PostCSS plugin to unwrap @layer rules for older browser compatibility.
 * Removes the @layer wrapper while keeping all rules inside it.
 * This means browsers that don't support @layer won't silently drop all styles.
 */
module.exports = () => {
  return {
    postcssPlugin: 'postcss-unwrap-layers',
    AtRule: {
      layer(atRule) {
        // @layer with nodes (e.g., @layer base { ... }) — unwrap
        if (atRule.nodes && atRule.nodes.length > 0) {
          atRule.replaceWith(atRule.nodes);
        } else {
          // @layer declaration (e.g., @layer components;) — remove
          atRule.remove();
        }
      },
    },
  };
};

module.exports.postcss = true;

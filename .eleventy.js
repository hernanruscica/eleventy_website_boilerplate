const CleanCSS = require("clean-css");
const path = require("path");
const fs = require("fs");

module.exports = function (eleventyConfig) {
  // --- PASSTHROUGH ---
  eleventyConfig.addPassthroughCopy({
    "src/assets/js": "assets/js",
    "src/assets/fonts": "assets/fonts",
    "src/assets/images": "assets/images",
  });

  // --- FILTRO cssmin ---
  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });

  // --- SHORTCODE criticalCss ---
  eleventyConfig.addShortcode("criticalCss", function () {
    const cssPath = path.join(__dirname, "src/assets/css/main.css");
    const css = fs.readFileSync(cssPath, "utf8");
    return new CleanCSS({}).minify(css).styles;
  });

  // --- SHORTCODE image ---
  eleventyConfig.addShortcode("image", async function (src, alt, sizes = "100vw") {
    if (alt === undefined) {
      throw new Error(`Missing required 'alt' attribute: ${src}`);
    }

    const Image = (await import("@11ty/eleventy-img")).default;
    const srcPath = path.join(__dirname, src);

    let metadata = await Image(srcPath, {
      widths: [400, 800, 1200],
      formats: ["avif", "webp", "jpeg"],
      outputDir: path.join(__dirname, "_site/assets/images"),
      urlPath: "/assets/images",
      filenameFormat: function (id, _src, width, format) {
        const imagesDir = path.join(__dirname, "src/assets/images");
        const relativeDir = path.relative(imagesDir, path.dirname(_src));
        const ext = path.extname(_src);
        const name = path.basename(_src, ext);
        return path.join(relativeDir, `${name}-${width}w.${format}`);
      },
    });

    return Image.generateHTML(metadata, {
      alt,
      sizes,
      loading: "lazy",
      decoding: "async",
    });
  });

  // --- TRANSFORM htmlmin (solo producción) ---
  if (process.env.NODE_ENV === "production") {
    eleventyConfig.addTransform("htmlmin", async function (content, outputPath) {
      if (!outputPath || !outputPath.endsWith(".html")) {
        return content;
      }
      const htmlMinifier = await import("html-minifier-terser");
      return htmlMinifier.minify(content, {
        collapseWhitespace: true,
        removeComments: true,
        removeOptionalTags: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        minifyJS: true,
        minifyCSS: true,
      });
    });
  }

  // --- TRANSFORM SVGO (solo SVG, producción) ---
  if (process.env.NODE_ENV === "production") {
    eleventyConfig.addTransform("svgo", async function (content, outputPath) {
      if (!outputPath || !outputPath.endsWith(".svg")) {
        return content;
      }
      const { optimize } = await import("svgo");
      const result = optimize(content, { path: outputPath });
      return result.data;
    });
  }

  // --- CONFIGURACIÓN ---
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_includes/layouts",
      data: "_data",
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};

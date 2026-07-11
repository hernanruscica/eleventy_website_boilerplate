const CleanCSS = require("clean-css");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const siteData = require("./src/_data/site.json");

module.exports = function (eleventyConfig) {
  // --- PASSTHROUGH ---
  eleventyConfig.addPassthroughCopy({
    "src/assets/js": "assets/js",
    "src/assets/fonts": "assets/fonts",
    "src/assets/images": "assets/images",
  });

  // --- FILTER cssmin ---
  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });

  // --- FILTER uniqueCategories ---
  eleventyConfig.addFilter("uniqueCategories", function (posts) {
    const seen = [];
    posts.forEach(function (p) {
      if (!seen.includes(p.category)) seen.push(p.category);
    });
    return seen;
  });

  // --- FILTER dateLong ---
  eleventyConfig.addFilter("dateLong", function (date) {
    const months = [
      "enero", "febrero", "marzo", "abril", "mayo", "junio",
      "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];
    var d;
    if (date instanceof Date) {
      d = date;
    } else {
      d = new Date(date + "T12:00:00");
    }
    return d.getUTCDate() + " de " + months[d.getUTCMonth()] + " de " + d.getUTCFullYear();
  });

  // --- FILTER absoluteUrl ---
  eleventyConfig.addFilter("absoluteUrl", function (path, base) {
    return base.replace(/\/$/, "") + path;
  });

  // --- FILTER dateISO ---
  eleventyConfig.addFilter("dateISO", function (date) {
    var d;
    if (date instanceof Date) {
      d = date;
    } else {
      d = new Date(date + "T12:00:00");
    }
    if (isNaN(d.getTime())) return "";
    return d.toISOString();
  });

  // --- COLLECTION posts ---
  eleventyConfig.addCollection("posts", function (collectionApi) {
    const posts = require("./src/_data/posts.json");
    return posts.map(function (post) {
      return {
        ...post,
        url: post.url,
        date: new Date(post.date + "T12:00:00"),
      };
    });
  });

  // --- SHORTCODE criticalCss ---
  eleventyConfig.addShortcode("criticalCss", function () {
    const cssPath = path.join(__dirname, "src/assets/css/main.css");
    const css = fs.readFileSync(cssPath, "utf8");
    return new CleanCSS({}).minify(css).styles;
  });

  // --- SHORTCODE jsTag (cache-busting via MD5 hash) ---
  eleventyConfig.addShortcode("jsTag", function (file) {
    const filePath = path.join(__dirname, "src/assets/js", file);
    const content = fs.readFileSync(filePath, "utf8");
    const hash = crypto.createHash("md5").update(content).digest("hex").slice(0, 8);
    return '<script src="/assets/js/' + file + '?_=' + hash + '" defer></script>';
  });

  // --- SHORTCODE image ---
  eleventyConfig.addShortcode("image", async function (src, alt, preset = "showcase_image", loading = "lazy") {
    if (alt === undefined) {
      throw new Error(`Missing required 'alt' attribute: ${src}`);
    }

    const presetConfig = siteData.imagePresets[preset];
    if (!presetConfig) {
      throw new Error(`Unknown image preset '${preset}'. Available: ${Object.keys(siteData.imagePresets).join(", ")}`);
    }

    const Image = (await import("@11ty/eleventy-img")).default;
    const srcPath = path.join(__dirname, src);

    let metadata = await Image(srcPath, {
      widths: presetConfig.widths,
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

    let html = Image.generateHTML(metadata, {
      alt,
      sizes: presetConfig.sizes,
      loading: loading,
      decoding: "async",
    });

    if (loading === "eager") {
      html = html.replace("<img ", '<img fetchpriority="high" ');
    }

    return html;
  });

  // --- TRANSFORM htmlmin (production only) ---
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

  // --- TRANSFORM SVGO (production only) ---
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

  // --- ELEVENTY CONFIG ---
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

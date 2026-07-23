const fs = require("fs");
const path = require("path");

describe("Vite route configuration", () => {
  test("build includes the direct product detail page routes", () => {
    const configPath = path.resolve(__dirname, "../vite.config.js");
    const configContents = fs.readFileSync(configPath, "utf8");

    [
      "src/product_pages/index.html",
      "src/product_pages/cedar-ridge-rimrock-2.html",
      "src/product_pages/marmot-ajax-3.html",
      "src/product_pages/northface-alpine-3.html",
      "src/product_pages/northface-talus-4.html",
    ].forEach((entry) => {
      expect(configContents).toContain(entry);
    });
  });
});

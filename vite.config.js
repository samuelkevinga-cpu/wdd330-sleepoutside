import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig(({ command }) => ({
  // GitHub Pages serves this repo at /wdd330-sleepoutside/
  // Keep base "/" for local `npm start` so localhost still works.
  base: command === "build" ? "/wdd330-sleepoutside/" : "/",
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
        product: resolve(__dirname, "src/product_pages/index.html"),
        product_listing: resolve(__dirname, "src/product_listing/index.html"),
        wishlist: resolve(__dirname, "src/wishlist/index.html"),
      },
    },
  },
}));

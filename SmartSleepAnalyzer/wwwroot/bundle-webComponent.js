const concat = require("concat");

(function bundle() {
  const files = [
    "./dist/webComponent/runtime.js",
    "./dist/webComponent/polyfills.js",
    "./dist/webComponent/main.js"
  ];
  concat(files, "./dist/webComponent/ngElement/ngElement.js");
  console.log("\n\nAngular Element bundle created successfully!");
})();

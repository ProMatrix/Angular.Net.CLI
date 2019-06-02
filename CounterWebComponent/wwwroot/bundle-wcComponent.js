const concat = require("concat");

(function bundle() {
  const files = [
    "./dist/wcCounter/runtime.js",
    "./dist/wcCounter/polyfills.js",
    "./dist/wcCounter/main.js"
  ];
  concat(files, "./dist/wcCounter/ngElement/counter-component.js");
  console.log("\n\nAngular Element bundle created successfully!");
})();



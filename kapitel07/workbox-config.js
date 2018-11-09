module.exports = {
  "globDirectory": "src/",
  "globPatterns": [
    "**/*.{css,js,html,jpg}"
  ],
  "globIgnores": ['workbox*/*'],
  "swDest": "src/sw.js",
  "swSrc": "sw-template.js"
};
const url = require('url');
const fs = require('fs');
const path = require('path');

const folder = path.resolve(__dirname, "build/public");
const defaultFile = "index.html"

const redirectMiddleware = function (req, res, next) {
  var fileName = url.parse(req.url).pathname;
  var fileExists = fs.existsSync(folder + fileName);

  // test the file name for a .ico file
  var faviconTest = fileName.match(/\/favicon\.ico/g);
  // test the file name for sub-folders
  var subfolderTest = fileName.match(/\//g).length > 1;
  // test to check if the requested url is a file or not
  var isCssJsFile = fileName.match(/\/css|\/js/g);

  if (
    !fileExists &&
    fileName.indexOf("browser-sync-client") < 0 &&
    !faviconTest
  ) {
    // if the we're in a subfolder and the request is a file (JS|CSS)
    // create a new filename without anything previous to the file folder
    if (subfolderTest && isCssJsFile) {
      // create a new file name using the file type
      var newNameRegEx = new RegExp(isCssJsFile[0] + "(.+)", "g");
      // request the new filename
      var newFileName = fileName.match(newNameRegEx)[0];
      req.url = newFileName;
    } else {
      // we're requesting the base folder so we need the regular index file
      req.url = "/" + defaultFile;
    }
  }

  return next();
};

var browserSync = require("browser-sync").create();

browserSync.init({
  files: ["app/css/*.css"],
  open: false,
  watch: true,
  server: {
    baseDir: "./build/public",
    middleware: [redirectMiddleware],
  },
});

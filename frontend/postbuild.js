const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "dist", "frontend", "browser", "index.csr.html");
const newFilePath = path.join(__dirname, "dist", "frontend", "browser", "index.html");

if (fs.existsSync(filePath)) {
  fs.renameSync(filePath, newFilePath);
  console.log("Renamed index.csr.html to index.html successfully!");
} else {
  console.log("index.csr.html not found!");
}

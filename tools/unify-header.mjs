import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const files = [
  "mega-max-15l-commercial-composter/index.html",
  "megagreen/index.html",
  "megacomposter/index.html",
  "sogaaiot/index.html",
  "tvsoga-app/index.html",
  "index.html",
  "tvsoga/index.html",
  "megacomercialcomposter/index.html",
  "privacy-policy/index.html",
  "playremote/index.html",
  "soganews/index.html",
  "megavision/index.html",
  "mega-max-15%e5%85%ac%e5%8d%87%e5%95%86%e7%94%a8%e5%bb%9a%e9%a4%98%e6%a9%9f/index.html",
];

function scriptPath(file) {
  const depth = path.dirname(file) === "." ? 0 : path.dirname(file).split("/").length;
  return `${"../".repeat(depth)}assets/site-header.js`;
}

for (const file of files) {
  const fullPath = path.join(root, file);
  const html = fs.readFileSync(fullPath, "utf8");
  const start = html.indexOf('<div class="fusion-tb-header"');
  const marker = '<div id="sliders-container"';
  const markerStart = html.indexOf(marker, start);

  if (start === -1 || markerStart === -1) {
    throw new Error(`Could not find header boundary in ${file}`);
  }

  const replacement = `<div data-site-header></div>\n<script src="${scriptPath(file)}"></script>\n`;
  const next = `${html.slice(0, start)}${replacement}${html.slice(markerStart)}`;
  fs.writeFileSync(fullPath, next);
  console.log(`updated ${file}`);
}

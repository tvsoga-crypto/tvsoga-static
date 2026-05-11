import { access, mkdir, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";

const root = "https://www.tvsoga.com/";
const outDir = path.resolve(process.env.OUT_DIR || ".");
const assetDir = path.join(outDir, "assets");

const pageUrls = new Map();
const assetMap = new Map();

function hash(input) {
  return createHash("sha1").update(input).digest("hex").slice(0, 10);
}

function cleanText(input) {
  return String(input || "")
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeUrl(raw, base) {
  if (!raw || raw.startsWith("data:") || raw.startsWith("mailto:") || raw.startsWith("tel:") || raw.startsWith("#")) {
    return null;
  }

  const decoded = raw.replaceAll("\\/", "/").replace(/&amp;/g, "&");
  try {
    return new URL(decoded, base).href;
  } catch {
    return null;
  }
}

function pagePath(url) {
  const parsed = new URL(url);
  const pathname = parsed.pathname;
  if (pathname === "/" || pathname === "") return "index.html";
  const trimmed = pathname.replace(/^\/|\/$/g, "");
  return `${trimmed}/index.html`;
}

function assetPath(url, contentType = "") {
  const parsed = new URL(url);
  const extFromPath = path.extname(parsed.pathname).split("?")[0];
  const extFromType =
    contentType.includes("text/css") ? ".css" :
    contentType.includes("javascript") ? ".js" :
    contentType.includes("image/webp") ? ".webp" :
    contentType.includes("image/png") ? ".png" :
    contentType.includes("image/jpeg") ? ".jpg" :
    contentType.includes("image/gif") ? ".gif" :
    contentType.includes("font/woff2") ? ".woff2" :
    contentType.includes("font/woff") ? ".woff" :
    contentType.includes("font/ttf") ? ".ttf" :
    "";
  const ext = extFromPath || extFromType || ".bin";
  const base = path.basename(parsed.pathname, extFromPath) || "asset";
  const safeBase = base.replace(/[^\w.-]+/g, "-").slice(0, 48);
  return `assets/${safeBase}-${hash(url)}${ext}`;
}

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      "user-agent": "Mozilla/5.0 static mirror for tvsoga.com",
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
    }
  });
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  return response.text();
}

async function fetchBuffer(url) {
  const response = await fetch(url, {
    headers: {
      "user-agent": "Mozilla/5.0 static mirror for tvsoga.com",
      "accept": "*/*"
    }
  });
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  return { bytes, contentType: response.headers.get("content-type") || "" };
}

function collectAssets(html, base) {
  const urls = new Set();
  const attrPattern = /\b(?:src|href|data-bg|data-bg-url|data-bg-medium|data-bg-small|data-bg-image|data-bg-image-medium|data-bg-image-small|data-orig-src|data-lazy-src|data-lazyload)=["']([^"']+)["']/gi;
  const srcsetPattern = /\b(?:srcset|data-srcset)=["']([^"']+)["']/gi;

  for (const match of html.matchAll(attrPattern)) {
    const url = normalizeUrl(match[1], base);
    if (url && shouldDownloadAsset(url)) urls.add(url);
  }

  for (const match of html.matchAll(srcsetPattern)) {
    for (const candidate of match[1].split(",")) {
      const first = candidate.trim().split(/\s+/)[0];
      const url = normalizeUrl(first, base);
      if (url && shouldDownloadAsset(url)) urls.add(url);
    }
  }

  for (const url of collectCssAssets(html, base)) {
    if (shouldDownloadAsset(url)) urls.add(url);
  }

  return [...urls];
}

function collectCssAssets(css, base) {
  const urls = new Set();
  const pattern = /(?:url\((['"]?)([^'")]+)\1\)|@import\s+url\((['"]?)([^'")]+)\3\))/gi;
  for (const match of css.matchAll(pattern)) {
    const url = normalizeUrl(match[2] || match[4], base);
    if (url && shouldDownloadAsset(url)) urls.add(url);
  }
  return [...urls];
}

function shouldDownloadAsset(url) {
  const parsed = new URL(url);
  const pathname = parsed.pathname.toLowerCase();
  if (!["www.tvsoga.com", "wp.tvsoga.com", "fonts.googleapis.com", "fonts.gstatic.com", "maxcdn.bootstrapcdn.com"].includes(parsed.hostname)) {
    return false;
  }
  return /\.(css|js|png|jpe?g|webp|gif|svg|ico|woff2?|ttf|eot)(\?|$)/i.test(pathname) ||
    parsed.hostname === "fonts.googleapis.com";
}

function rewriteHtml(html, base) {
  let output = html;

  for (const [url, local] of [...assetMap].sort((a, b) => b[0].length - a[0].length)) {
    output = output.split(url).join(relativeFromPage(base, local));
    output = output.split(url.replace("https:", "")).join(relativeFromPage(base, local));
    output = output.split(url.replaceAll("/", "\\/")).join(relativeFromPage(base, local));
  }

  for (const [url, local] of [...pageUrls].sort((a, b) => b[0].length - a[0].length)) {
    output = output.split(url).join(relativeFromPage(base, local));
    output = output.split(url.replace(/\/$/, "")).join(relativeFromPage(base, local));
  }

  output = output.replace(/https:\/\/www\.tvsoga\.com\/wp-json\/[^"']+/g, "#");
  return output;
}

function rewriteCss(css, cssUrl) {
  let output = css;
  for (const assetUrl of collectCssAssets(css, cssUrl)) {
    const local = assetMap.get(assetUrl);
    if (local) {
      const cssLocal = assetMap.get(cssUrl);
      const from = cssLocal ? path.dirname(cssLocal) : "assets";
      output = output.split(assetUrl).join(path.posix.relative(from, local).replaceAll("\\", "/"));
      output = output.split(assetUrl.replace("https:", "")).join(path.posix.relative(from, local).replaceAll("\\", "/"));
    }
  }
  return output;
}

function relativeFromPage(pageUrl, localTarget) {
  const from = path.posix.dirname(pagePath(pageUrl));
  const relative = path.posix.relative(from, localTarget).replaceAll("\\", "/");
  return relative || path.posix.basename(localTarget);
}

async function discoverPages() {
  pageUrls.set(root, "index.html");
  const json = await fetchText(`${root}wp-json/wp/v2/pages?per_page=100&_fields=link,title`);
  const pages = JSON.parse(json);
  for (const page of pages) {
    pageUrls.set(page.link, pagePath(page.link));
    console.log(`page: ${cleanText(page.title.rendered)} -> ${pagePath(page.link)}`);
  }
}

async function downloadAssets(urls) {
  const queue = [...new Set(urls)];
  for (let index = 0; index < queue.length; index += 1) {
    const url = queue[index];
    if (assetMap.has(url)) continue;

    try {
      const likelyLocal = assetPath(url);
      const likelyFullPath = path.join(outDir, likelyLocal);
      if (await exists(likelyFullPath)) {
        assetMap.set(url, likelyLocal);
        console.log(`asset cached: ${likelyLocal}`);
        continue;
      }

      const { bytes, contentType } = await fetchBuffer(url);
      const local = assetPath(url, contentType);
      assetMap.set(url, local);
      await mkdir(path.dirname(path.join(outDir, local)), { recursive: true });

      let content = bytes;
      if (contentType.includes("text/css") || url.includes("fonts.googleapis.com")) {
        const css = bytes.toString("utf8");
        const nested = collectCssAssets(css, url);
        queue.push(...nested);
        content = Buffer.from(rewriteCss(css, url), "utf8");
      }

      await writeFile(path.join(outDir, local), content);
      console.log(`asset: ${local}`);
    } catch (error) {
      console.warn(`skip asset: ${url} (${error.message})`);
    }
  }
}

async function main() {
  await mkdir(outDir, { recursive: true });
  await mkdir(assetDir, { recursive: true });
  await discoverPages();

  const pages = [];
  const allAssets = new Set();

  for (const url of pageUrls.keys()) {
    try {
      const html = await fetchText(url);
      pages.push({ url, html });
      collectAssets(html, url).forEach((asset) => allAssets.add(asset));
      console.log(`fetched page: ${url}`);
    } catch (error) {
      console.warn(`skip page: ${url} (${error.message})`);
    }
  }

  await downloadAssets([...allAssets]);

  for (const page of pages) {
    const local = pagePath(page.url);
    const output = rewriteHtml(page.html, page.url);
    await mkdir(path.dirname(path.join(outDir, local)), { recursive: true });
    await writeFile(path.join(outDir, local), output);
    console.log(`write page: ${local}`);
  }

  await writeFile(
    path.join(outDir, "README.md"),
    "# SOGA Static Mirror\n\nThis folder is a static mirror of the public tvsoga.com WordPress site. It preserves the original layout and animation assets as closely as possible while removing the need for WordPress at runtime.\n",
    "utf8"
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

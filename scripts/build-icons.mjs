// Generate the sprite from genuine MIT-licensed Tabler SVG files.
// Run: node scripts/build-icons.mjs
import { readFile, writeFile, mkdir } from "node:fs/promises";
const upstream = "https://raw.githubusercontent.com/tabler/tabler-icons/main/icons/outline/";
const aliases = {
 menu:"menu-2",message:"message-circle",edit:"edit",trash:"trash",info:"info-circle",
 alert:"alert-triangle",help:"help-circle",grid:"layout-grid",quote:"quote",
 shield:"shield-check",check_square:"checkbox",mail:"mail",sort:"arrows-sort",
 reply:"arrow-back-up",refresh:"refresh",pin:"pin",calendar:"calendar",
 unlock:"lock-open",image:"photo",
 "check-square":"checkbox"
};
const js = await readFile("javascripts/discourse/api-initializers/tabler-icons.js","utf8");
const mappings = [...js.matchAll(/api\.replaceIcon\("([^"]+)", "tabler-([^"]+)"\)/g)].map(m=>[m[1],m[2]]);
const names = [...new Set(mappings.map(x=>x[1]))];
const symbols = [];
const missing = [];
for (const name of names) {
  const upstreamName = aliases[name] ?? name;
  const url = upstream + upstreamName + ".svg";
  const response = await fetch(url);
  if (!response.ok) {
    missing.push(name + " -> " + upstreamName + " (HTTP " + response.status + ")");
    continue;
  }
  const svg = await response.text();
  const match = svg.match(/<svg\b[^>]*>([\s\S]*?)<\/svg>/);
  if (!match) throw new Error("Malformed upstream SVG: " + name);
  const content = match[1].replace(/<!--([\s\S]*?)-->/g,"").trim();
  symbols.push('<symbol id="tabler-' + name + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + content + '</symbol>');
}
if (missing.length) throw new Error("Missing upstream Tabler icons:\n" + missing.join("\n"));
await mkdir("assets",{recursive:true});
await writeFile("assets/icons-sprite.svg", '<svg xmlns="http://www.w3.org/2000/svg">\n' + symbols.join("\n") + '\n</svg>\n');
console.log("Generated " + symbols.length + " genuine Tabler icons for " + mappings.length + " Discourse mappings");

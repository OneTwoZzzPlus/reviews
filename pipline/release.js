import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import archiver from "archiver";

const manifestPath = "src/manifest.json";
const distDir = "dist";
const releasesDir = "releases";
const notesFile = "release-notes.md";

// Read version from manifest.json
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const version = manifest.version;
const tag = `v${version}`;
const archiveName = `./${releasesDir}/dist-${version}.zip`;
const archivePath = path.resolve(archiveName);

console.log(`[RELEASE] Version: ${version}`);
console.log(`[RELEASE] Tag: ${tag}`);

// Validate dist directory
if (!fs.existsSync(distDir) || fs.readdirSync(distDir).length === 0) {
    console.error("[RELEASE] dist directory is missing or empty");
    process.exit(1);
}

// Remove existing archive if present
if (fs.existsSync(archivePath)) {
    fs.unlinkSync(archivePath);
}

// Zip only the contents of dist/
console.log("[RELEASE] Creating archive...");
const output = fs.createWriteStream(archivePath);
const archive = archiver("zip", { zlib: { level: 9 } });

archive.pipe(output);
archive.directory(distDir, false);

await archive.finalize();

// Create GitHub release
console.log("[RELEASE] Creating GitHub release...");
execSync(
    `gh release create ${tag} ${archiveName} --notes-file ${notesFile}`,
    { stdio: "inherit" }
);

console.log("[RELEASE] Release completed successfully");
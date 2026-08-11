import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.resolve(dirname, "dist");
const RELEASES_DIR = path.resolve(dirname, "releases");
const MANIFEST_PATH = path.resolve(dirname, "manifest.json");
const NOTES_FILE = path.resolve(dirname, "release-notes.md");

async function main() {
    const startTime = Date.now();
    try {
        console.log("\n🚀 [Release] Starting...");

        // Build production assets before release
        console.log("\n📦 [Build] Running production build...");
        execSync("npm run build:ext:prod", { stdio: "inherit" });

        // Read version from manifest
        if (!fs.existsSync(MANIFEST_PATH)) {
            throw new Error(
                `[release error] Manifest file not found at ${MANIFEST_PATH}`,
            );
        }
        const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
        const version = manifest.version;
        const tag = `v${version}`;

        console.log(`  ✔ Version: ${version} (${tag})`);

        // Ensure releases directory exists
        if (!fs.existsSync(RELEASES_DIR)) {
            fs.mkdirSync(RELEASES_DIR, { recursive: true });
        }

        // Ensure dist directory exists and is not empty
        if (!fs.existsSync(DIST_DIR) || fs.readdirSync(DIST_DIR).length === 0) {
            throw new Error(
                "[release error] dist directory is missing or empty",
            );
        }

        const archiveName = path.join(RELEASES_DIR, `dist-${version}.zip`);

        // Remove existing archive for this version if present
        if (fs.existsSync(archiveName)) {
            fs.unlinkSync(archiveName);
        }

        // Create ZIP archive with guaranteed POSIX path separators (/)
        console.log("\n📁 [Archive] Creating ZIP package...");
        if (process.platform === "win32") {
            const distPath = DIST_DIR.replace(/\\/g, "/");
            const zipPath = archiveName.replace(/\\/g, "/");

            // (/)
            const psCommand = `
                Add-Type -Assembly 'System.IO.Compression.FileSystem';
                $zip = [System.IO.Compression.ZipFile]::Open('${zipPath}', 'Create');
                Get-ChildItem -Path '${distPath}' -Recurse | ForEach-Object {
                    if (-not $_.PSIsContainer) {
                        $relPath = $_.FullName.Substring('${distPath}'.Length + 1).Replace('\\', '/');
                        [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $_.FullName, $relPath);
                    }
                };
                $zip.Dispose();
            `.replace(/\s+/g, " ");

            execSync(`powershell -Command "${psCommand}"`);
        } else {
            execSync(`zip -r "${archiveName}" .`, { cwd: DIST_DIR });
        }

        console.log(`  ✔ Archive created: ${archiveName}`);

        // Set release notes flag (from file or default string)
        const notesFlag = fs.existsSync(NOTES_FILE)
            ? `--notes-file "${NOTES_FILE}"`
            : `--notes "Release ${tag}"`;

        // Create GitHub release
        console.log("\n🏷️  [GitHub] Creating release...");
        execSync(`gh release create ${tag} "${archiveName}" ${notesFlag}`, {
            stdio: "inherit",
        });
        console.log(`  ✔ GitHub release ${tag} published`);

        console.log(
            `\n✨ Release completed successfully in ${Date.now() - startTime}ms`,
        );
    } catch (err) {
        console.error("\n❌ Release failed:", err.message || err);
        process.exit(1);
    }
}

main();

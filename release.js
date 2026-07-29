import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import archiver from "archiver";

const manifestPath = "src/manifest.json";
const distDir = "dist";
const releasesDir = "releases";
const notesFile = "release-notes.md";

try {
    // 1. Автоматически собираем свежий продакшн-билд перед релизом
    console.log("[RELEASE] Running production build...");
    execSync("npm run build:ext:prod", { stdio: "inherit" });

    // 2. Читаем версию из манифеста
    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    const version = manifest.version;
    const tag = `v${version}`;

    // 3. Создаем папку releases/, если ее еще нет
    if (!fs.existsSync(releasesDir)) {
        fs.mkdirSync(releasesDir, { recursive: true });
    }

    const archiveName = path.join(releasesDir, `dist-${version}.zip`);

    console.log(`[RELEASE] Version: ${version}`);
    console.log(`[RELEASE] Tag: ${tag}`);

    // 4. Проверяем наличие dist/
    if (!fs.existsSync(distDir) || fs.readdirSync(distDir).length === 0) {
        console.error("[RELEASE] Error: dist directory is missing or empty");
        process.exit(1);
    }

    // Удаляем прошлый архив с этой же версией, если он был
    if (fs.existsSync(archiveName)) {
        fs.unlinkSync(archiveName);
    }

    // 5. Создаем ZIP-архив и строго ждем события 'close' у потока
    console.log("[RELEASE] Creating zip archive...");
    await new Promise((resolve, reject) => {
        const output = fs.createWriteStream(archiveName);
        const archive = archiver("zip", { zlib: { level: 9 } });

        output.on("close", resolve);
        archive.on("error", reject);

        archive.pipe(output);
        archive.directory(distDir, false);
        archive.finalize();
    });

    console.log(`[RELEASE] Archive created: ${archiveName}`);

    // 6. Формируем флаг для чейнджлога (файл или дефолтный текст)
    const notesFlag = fs.existsSync(notesFile) 
        ? `--notes-file "${notesFile}"` 
        : `--notes "Release ${tag}"`;

    // 7. Создаем релиз на GitHub
    console.log("[RELEASE] Creating GitHub release...");
    execSync(`gh release create ${tag} "${archiveName}" ${notesFlag}`, {
        stdio: "inherit"
    });

    console.log("[RELEASE] Release completed successfully!");
} catch (err) {
    console.error("[RELEASE] Release failed:", err.message);
    process.exit(1);
}
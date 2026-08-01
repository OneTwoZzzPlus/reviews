import esbuild from "esbuild";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC_DIR = path.resolve(dirname, "src");
const STATIC_DIR = path.resolve(dirname, "static");
const DIST_DIR = path.resolve(dirname, "dist");
const PAGE_DIR = path.resolve(dirname, "page");

const API_HOST_VALUE = process.env.API_HOST_VALUE || "";

const args = process.argv.slice(2);
const hasExtFlag = args.includes("--ext") || args.includes("--extension");
const hasPageFlag = args.includes("--page");

const buildAll = !hasExtFlag && !hasPageFlag;
const buildExt = buildAll || hasExtFlag;
const buildPageTarget = buildAll || hasPageFlag;

const isProd =
    process.env.NODE_ENV === "production" || args.includes("--minify");

function getEntryPoint(targetDir, name) {
    const jsxPath = path.join(targetDir, `${name}.jsx`);
    const jsPath = path.join(targetDir, `${name}.js`);

    if (fs.existsSync(jsxPath)) return jsxPath;
    if (fs.existsSync(jsPath)) return jsPath;
    throw new Error(
        `[build error] Entry point "${name}" (.js/.jsx) not found in ${targetDir}`,
    );
}

const baseEsbuildConfig = {
    bundle: true,
    minify: false,
    sourcemap: !isProd,
    target: ["chrome110"],
    loader: { ".js": "jsx" },
    jsx: "automatic",
    jsxImportSource: "preact",
    define: {
        API_HOST: JSON.stringify(API_HOST_VALUE),
    },
};

async function buildExtension() {
    console.log("\n📦 [Extension] Building...");
    if (!fs.existsSync(DIST_DIR)) fs.mkdirSync(DIST_DIR, { recursive: true });

    const extSrcDir = path.join(SRC_DIR, "extension");

    // 1. Сборка точек входа из src/extension/
    await esbuild.build({
        ...baseEsbuildConfig,
        entryPoints: [getEntryPoint(extSrcDir, "injector")],
        outfile: path.join(DIST_DIR, "injector.js"),
    });
    console.log("  ✔ injector.js");

    await esbuild.build({
        ...baseEsbuildConfig,
        entryPoints: [getEntryPoint(extSrcDir, "popup")],
        outfile: path.join(DIST_DIR, "popup.js"),
    });
    console.log("  ✔ popup.js");

    // 2. Копирование manifest.json из корня проекта
    const manifestPath = path.join(dirname, "manifest.json");
    if (fs.existsSync(manifestPath)) {
        fs.copyFileSync(manifestPath, path.join(DIST_DIR, "manifest.json"));
    }

    // 3. Копирование HTML/CSS из src/extension/
    ["popup.html", "popup.css"].forEach((file) => {
        const srcPath = path.join(extSrcDir, file);
        if (fs.existsSync(srcPath)) {
            fs.copyFileSync(srcPath, path.join(DIST_DIR, file));
        }
    });

    // 4. Копирование общих стилей из src/
    const globalStyles = path.join(SRC_DIR, "styles.css");
    if (fs.existsSync(globalStyles)) {
        fs.copyFileSync(globalStyles, path.join(DIST_DIR, "styles.css"));
    }

    const iconsSrc = path.join(STATIC_DIR, "icons");
    if (fs.existsSync(iconsSrc)) {
        fs.cpSync(iconsSrc, path.join(DIST_DIR, "icons"), { recursive: true });
    }
    console.log("  ✔ Static assets & icons copied");
}

async function buildWebPage() {
    console.log("\n🌐 [Web Page] Building...");
    if (!fs.existsSync(PAGE_DIR)) fs.mkdirSync(PAGE_DIR, { recursive: true });

    const pageSrcDir = path.join(SRC_DIR, "page");

    // 1. Сборка page.js из src/page/
    await esbuild.build({
        ...baseEsbuildConfig,
        entryPoints: [getEntryPoint(pageSrcDir, "page")],
        outfile: path.join(PAGE_DIR, "page.js"),
    });
    console.log("  ✔ page.js");

    // 2. Копирование файлов из src/page/ и общих стилей
    fs.copyFileSync(
        path.join(pageSrcDir, "page.html"),
        path.join(PAGE_DIR, "index.html"),
    );
    fs.copyFileSync(
        path.join(SRC_DIR, "styles.css"),
        path.join(PAGE_DIR, "styles.css"),
    );
    fs.copyFileSync(
        path.join(pageSrcDir, "page.css"),
        path.join(PAGE_DIR, "page.css"),
    );

    const faviconPath = path.join(STATIC_DIR, "favicon.ico");
    if (fs.existsSync(faviconPath)) {
        fs.copyFileSync(faviconPath, path.join(PAGE_DIR, "favicon.ico"));
    }
    console.log("  ✔ index.html, styles.css, page.css & favicon copied");
}

async function main() {
    const startTime = Date.now();
    try {
        const tasks = [];
        if (buildExt) tasks.push(buildExtension());
        if (buildPageTarget) tasks.push(buildWebPage());

        await Promise.all(tasks);
        console.log(
            `\n✨ Build completed successfully in ${Date.now() - startTime}ms`,
        );
    } catch (err) {
        console.error("\n❌ Build failed:", err);
        process.exit(1);
    }
}

main();

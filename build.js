import esbuild from 'esbuild';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC_DIR = path.resolve(dirname, 'src');
const STATIC_DIR = path.resolve(dirname, 'static');
const DIST_DIR = path.resolve(dirname, 'dist');
const PAGE_DIR = path.resolve(dirname, 'page');

const API_HOST_VALUE = process.env.API_HOST_VALUE || '';

const args = process.argv.slice(2);
const hasExtFlag = args.includes('--ext') || args.includes('--extension');
const hasPageFlag = args.includes('--page');

const buildAll = !hasExtFlag && !hasPageFlag;
const buildExt = buildAll || hasExtFlag;
const buildPageTarget = buildAll || hasPageFlag;

const isProd = process.env.NODE_ENV === 'production' || args.includes('--minify');

/** Поиск точки входа (.jsx или .js) */
function getEntryPoint(name) {
    const jsxPath = path.join(SRC_DIR, `${name}.jsx`);
    const jsPath = path.join(SRC_DIR, `${name}.js`);

    if (fs.existsSync(jsxPath)) return jsxPath;
    if (fs.existsSync(jsPath)) return jsPath;
    throw new Error(`[build error] Entry point "${name}" (.js/.jsx) not found in ${SRC_DIR}`);
}

const baseEsbuildConfig = {
    bundle: true,
    minify: isProd,
    sourcemap: !isProd,
    target: ['chrome110'],
    loader: { '.js': 'jsx' },
    define: {
        'API_HOST': JSON.stringify(API_HOST_VALUE)
    }
};

async function buildExtension() {
    console.log('\n📦 [Extension] Building...');
    if (!fs.existsSync(DIST_DIR)) fs.mkdirSync(DIST_DIR, { recursive: true });

    await esbuild.build({
        ...baseEsbuildConfig,
        entryPoints: [getEntryPoint('injector')],
        outfile: path.join(DIST_DIR, 'injector.js'),
    });
    console.log('  ✔ injector.js');

    await esbuild.build({
        ...baseEsbuildConfig,
        entryPoints: [getEntryPoint('popup')],
        outfile: path.join(DIST_DIR, 'popup.js'),
    });
    console.log('  ✔ popup.js');

    const extensionFiles = ['manifest.json', 'styles.css', 'popup.html'];
    extensionFiles.forEach(file => {
        const srcPath = path.join(SRC_DIR, file);
        if (fs.existsSync(srcPath)) {
            fs.copyFileSync(srcPath, path.join(DIST_DIR, file));
        }
    });

    const iconsSrc = path.join(STATIC_DIR, 'icons');
    if (fs.existsSync(iconsSrc)) {
        fs.cpSync(iconsSrc, path.join(DIST_DIR, 'icons'), { recursive: true });
    }
    console.log('  ✔ Static assets & icons copied');
}

async function buildWebPage() {
    console.log('\n🌐 [Web Page] Building...');
    if (!fs.existsSync(PAGE_DIR)) fs.mkdirSync(PAGE_DIR, { recursive: true });

    await esbuild.build({
        ...baseEsbuildConfig,
        entryPoints: [getEntryPoint('page')],
        outfile: path.join(PAGE_DIR, 'page.js'),
    });
    console.log('  ✔ page.js');

    fs.copyFileSync(path.join(SRC_DIR, 'page.html'), path.join(PAGE_DIR, 'index.html'));
    fs.copyFileSync(path.join(SRC_DIR, 'styles.css'), path.join(PAGE_DIR, 'styles.css'));

    const faviconPath = path.join(STATIC_DIR, 'favicon.ico');
    if (fs.existsSync(faviconPath)) {
        fs.copyFileSync(faviconPath, path.join(PAGE_DIR, 'favicon.ico'));
    }
    console.log('  ✔ index.html, styles.css & favicon copied');
}

async function main() {
    const startTime = Date.now();
    try {
        const tasks = [];
        if (buildExt) tasks.push(buildExtension());
        if (buildPageTarget) tasks.push(buildWebPage());

        await Promise.all(tasks);
        console.log(`\n✨ Build completed successfully in ${Date.now() - startTime}ms`);
    } catch (err) {
        console.error('\n❌ Build failed:', err);
        process.exit(1);
    }
}

main();
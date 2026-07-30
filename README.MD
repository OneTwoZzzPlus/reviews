# Сайт с отзывами

⚡ [Открыть приложение на сайте](https://onetwozzzplus.github.io/reviews/)

# Расширение для браузера

❤ [Скачайте последнюю собранную версию расширения тут](https://github.com/OneTwoZzzPlus/reviews/releases/)

**Два режима работы!**

- Быстрый поиск по предмету или преподавателю в окне расширения.
- Встраивание на страницу преподавателя на сайте.

# Для желающих разрабатывать...

### Установка зависимостей

```shell
npm install
npm install --save-dev esbuild cross-env archiver
```

### Сборка проекта (`build.js`)

Сборка сайта и расширения одной командой.

```shell
npm run build:prod
npm run build:dev # если api на localhost:8000
```

<details>
<summary>Отдельная сборка сайта</summary>

```shell
npm run build:page:prod
npm run build:page:dev  # если api на localhost:8000
```

</details>

<details>
<summary>Отдельная сборка расширения</summary>

```shell
npm run build:ext:prod
npm run build:ext:dev  # если api на localhost:8000
```

</details>

### Деплой сайта (Github Pages)

Деплой веб-версии происходит автоматически через GitHub Actions при каждом push в ветку main. Ручная сборка не требуется.

```shell
git add .
git commit -m "commit message"
git push origin main
```

### Релиз расширения `release.js`

```shell
npm run release
```

- В `manifest.json` описаны основные характеристики браузерного расширения, необходимые браузеру, в том числе версия.
- Для описания релиза будет использовано `release-notes.md`.

### Содержимое `src`

Существует три точки входа

1. `page/page.html` запускает `page/page.js` который обеспечивает работу сайта
2. `extension/popup.html` запускает `extension/popup.js` который обеспечивает работу окошечка
3. `extension/injector.js` производит встраивание на сайт блока отзывов и поиск jwt токена

В `style.css` хранятся топовые стили. **Ни в коем случае** не переназначайте общие стили элементов тут, используйте для этого `page/page.css` и `extension/popup.css`, иначе переопределяться стили inject-сайта.

Продолжение не следует...

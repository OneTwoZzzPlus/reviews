# [Reviews](https://onetwozzzplus.github.io/reviews/#/) - отзывы на преподавателей

> Понравился проект? Не забудь поставить ⭐ на репозитории.

[![Frontend Repository](https://img.shields.io/badge/Frontend-24292E?style=for-the-badge&logo=github&logoColor=white)](https://github.com/OneTwoZzzPlus/reviews)
[![Backend Repository](https://img.shields.io/badge/Backend-24292E?style=for-the-badge&logo=github&logoColor=white)](https://github.com/OneTwoZzzPlus/reviews-backend)

## Расширение для браузера

🧩 Доступно для установки в [Chrome Web Store](https://chromewebstore.google.com/detail/reviews/dgcgdbgpjhcppmdphanlbhlobimoclbc)

- Цветовая подсветка ФИО согласно отзывам (полезно на выборности).
- Встраивание на страницу преподавателя на сайте.
- Быстрый поиск по предмету или преподавателю в окне расширения.

📦 Скачайте последнюю собранную версию расширения [тут](https://github.com/OneTwoZzzPlus/reviews/releases/)

## Стек

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![esbuild](https://img.shields.io/badge/esbuild-FFCF00?style=for-the-badge&logo=esbuild&logoColor=black)
![Chrome Extension](https://img.shields.io/badge/Manifest_V3-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white)

## Разработчикам

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

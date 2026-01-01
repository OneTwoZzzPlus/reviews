# Установка

[Скачайте последнюю версию тут](https://github.com/OneTwoZzzPlus/reviews-extension/releases/)

# Сборка расширения

Установка
```shell
npm init -y
npm install --save-dev esbuild
npm install --save-dev cross-env
npm install --save-dev archiver
```

Сборка
```shell
node run build:prod
```

# Релиз (*for contributor only*)
```shell
node run release
```

# TODO
- карма и рейтинг
- сортировка отзывов по карме
- оставление отзывов
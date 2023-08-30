# 永豐

## Env

```
$ qpdf --version
qpdf version 11.5.0

$ nvm version
1.1.11

$ node -v
v18.12.1

$ npm install -g yarn

$ yarn -v
1.22.19
```

## Create Project

```
npm init -y
# 加入一些套件到 package.json
yarn
tsc --init
```

## Start

```
yarn
yarn start
```

## `pdf-parse` Notes

```js
// 目前永豐測試到的都是使用 pdf-parse v1.10.100
// 搜尋
textContent.items.push(runBidiTransform(textContentItem));

// 搜尋此行
// str: normalizeWhitespace ? replaceWhitespace(bidiResult.str) : bidiResult.str,
// 取代成
str: `/fuck/${str}`,
```





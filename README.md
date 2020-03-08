# acejax
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Downloads](https://img.shields.io/npm/dm/acejax.svg)](https://npmjs.com/acejax)

> Zero dependency, Promise based HTTP request library for Node.js

## Install

```
$ npm install --save acejax
```

## Usage

```js
const acejax = require('acejax');

const myFunction = async () => {
    try {
        const result = await acejax.get('https://github.com/acestojanoski/acejax');
        console.log(result.body);
        // output: <!doctype html>...
    } catch(error) {
        console.error(error);
        // output: { AcejaxError: Unauthorized...
    }
};

myFunction();
```

```js
const acejax = require('acejax');

const myFunction = async () => {
    try {
        const result = await acejax({
            url: 'https://some-api-endpoint',
            method: 'get',
            json: true,
        });

        console.log(result.body);
        /* output (json parsed):
        *   {
        *       id: 1,
        *       name: 'some name', ...
        *   }
        */
    } catch(error) {
        console.error(error);
        // output: { AcejaxError: Forbidden...
    }
};

myFunction();
```

## API

## LICENSE
[MIT](./LICENSE)

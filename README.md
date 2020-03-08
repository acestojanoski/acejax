# acejax
[![CircleCI](https://circleci.com/gh/acestojanoski/acejax/tree/master.svg?style=svg)](https://circleci.com/gh/acestojanoski/acejax/tree/master)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![install size](https://packagephobia.now.sh/badge?p=acejax)](https://packagephobia.now.sh/result?p=acejax)
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

### acejax(options)

Returns a Promise.

#### options
Type: `object`

##### url
Type: `string`

The request URL.

##### method
Type: `string`

Default: `GET`

The request method.

##### headers
Type: `object`

Default:
```
{
    'User-Agent': 'acejax (https://github.com/acestojanoski/acejax)'
}
```

The request headers.

##### timeout
Type: `number`

The request timeout.

##### json
Type: `boolean`

Default: `false`

If it is set to `true`, the acejax library will use the JSON.parse() function to parse the response body.

##### body
Type: `string | object | Buffer`

The request body.

##### form
Type: `object | string`

If this option is provided the `Content-Type` header will be set to `application/x-www-form-urlencoded`.

If it is an object, the object will be converted to string using `new URLSearchParams(object).toString()`.

### acejax.get(url, headers?)
### acejax.delete(url, headers?)
### acejax.post(url, body?, headers?)
### acejax.put(url, body?, headers?)
### acejax.patch(url, body?, headers?)

### Response
Type: `object`

On promise rejection, it will be an instance of the custom error class `AcejaxError`. The `name` of the error will be set to `AcejaxError`, and the error message will be the `statusMessage` of the response. Additionally, it contains the standard response properties:

#### statusCode
Type: `number`

The response status code.

#### statusMessage
Type: `string`

The response status message.

#### headers
Type: `object`

The response headers.

#### rawHeaders
Type: `Array<string>`

The response rawHeaders

#### httpVersion
Type: `string`

The response http version.

#### body
Type: `string | object`

The body of the response.

## LICENSE
[MIT](./LICENSE)

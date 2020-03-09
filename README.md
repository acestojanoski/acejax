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
        const result = await acejax('https://github.com/acestojanoski/acejax');
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
        const result = await acejax('https://some-api-endpoint', { json: true }});

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

### acejax(url, acejaxOptions?)
Returns: `Promise`

Both resolved and rejected Promise will have the same format: [Response](#Response)

#### url
Type: `string`

The request URL.

#### acejaxOptions
Type: `object`

The [https.request()](https://nodejs.org/api/https.html#https_https_request_options_callback) options.

##### json
Type: `boolean`

Default: `false`

If this is set to `true`, the acejax library will use the JSON.parse() function to parse the response body.

##### body
Type: `string | object | Buffer`

The request body.

##### form
Type: `object | string`

If this option is provided the `Content-Type` header will be set to `application/x-www-form-urlencoded`.

If it is an object, the object will be converted to string using `new URLSearchParams(object).toString()`.

### acejax.get(url, acejaxOptions?)
### acejax.delete(url, acejaxOptions?)
### acejax.post(url, acejaxOptions?)
### acejax.put(url, acejaxOptions?)
### acejax.patch(url, acejaxOptions?)

### Response
Type: `object`

On promise rejection, it will be an instance of the custom error class `AcejaxError`. The `name` of the error will be set to `AcejaxError`, and the error message will be the `statusMessage` of the response. Additionally, it contains the standard response properties.

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

#### acejaxOptions
Type: `object`

It will return back the acejaxOptions.

#### url
Type: `string`

It will return back the request url.

#### body
Type: `string | object`

The body of the response.

## LICENSE
[MIT](./LICENSE)

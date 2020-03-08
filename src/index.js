import {request} from 'https';
import {globalAgent} from 'http';
import {parse as parseUrl} from 'url';

import {isObject} from './utils';
import AcejaxError from './acejax-error';

const defaults = {
	method: 'GET',
	headers: {},
	json: false,
};

const acejax = (acejaxRequest = defaults) =>
	new Promise((resolve, reject) => {
		const initialOptions = Object.assign({}, defaults, acejaxRequest);

		const parsedUrl = parseUrl(initialOptions.url);

		const options = Object.assign({}, parsedUrl, {
			headers: initialOptions.headers,
			method: initialOptions.method && initialOptions.method.toUpperCase(),
			timeout: initialOptions.timeout,
		});

		if (parsedUrl.protocol === 'http:') {
			options.agent = globalAgent;
		}

		const req = request(options, res => {
			let data = '';

			res.on('data', chunk => (data += chunk));

			res.on('end', () => {
				if (res.statusCode >= 400) {
					const acejaxError = new AcejaxError(res, data);
					reject(acejaxError);
				} else {
					resolve({
						statusCode: res.statusCode,
						statusMessage: res.statusMessage,
						headers: res.headers,
						rawHeaders: res.rawHeaders,
						httpVersion: res.httpVersion,
						body: initialOptions.json ? JSON.parse(data) : data,
					});
				}
			});
		});

		req.on('error', reject);

		if (initialOptions.body) {
			let body = initialOptions.body;
			if (isObject(body)) {
				body = JSON.stringify(body);
				req.setHeader('Content-Type', 'application/json');
			}

			req.write(body);
		}

		if (initialOptions.form) {
			let form = initialOptions.form;
			if (isObject(form)) {
				form = new URLSearchParams(form).toString();
			}

			req.setHeader('Content-Type', 'application/x-www-form-urlencoded');
			req.write(form);
		}

		req.end();
	});

acejax.get = (url, headers) => acejax({method: 'get', url, headers});
acejax.delete = (url, headers) => acejax({method: 'delete', url, headers});
acejax.put = (url, body, headers) => acejax({method: 'put', url, body, headers});
acejax.post = (url, body, headers) => acejax({method: 'post', url, body, headers});
acejax.patch = (url, body, headers) => acejax({method: 'patch', url, body, headers});

export default acejax;

// Exports for common js support
module.exports = acejax;
module.exports.default = acejax;

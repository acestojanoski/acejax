import {request} from 'https';
import {globalAgent} from 'http';

import {isObject, isString} from './utils';
import AcejaxError from './acejax-error';
import getUrlOptions from './get-url-options';
import buildResponse from './build-response';

const defaults = {
	method: 'GET',
	headers: {
		'User-Agent': 'acejax (https://github.com/acestojanoski/acejax)',
	},
	json: false,
};

const acejax = (url, acejaxOptions = defaults) => {
	if (!url) {
		throw new TypeError('`url` argument is missing');
	}

	if (!isString(url)) {
		throw new TypeError('`url` argument must be a string');
	}

	if (!isObject(acejaxOptions)) {
		throw new TypeError('`acejaxOptions` argument must be an object');
	}

	return new Promise((resolve, reject) => {
		const {json, body, form, ...requestOptions} = acejaxOptions;
		const urlOptions = getUrlOptions(url);

		if (urlOptions.protocol === 'http:') {
			requestOptions.agent = globalAgent;
		}

		const options = Object.assign({}, defaults, urlOptions, requestOptions);

		const req = request(options, res => {
			res.body = '';
			res.url = url;
			res.acejaxOptions = acejaxOptions;

			res.on('data', chunk => (res.body += chunk));

			res.on('end', () => {
				if (res.statusCode >= 400) {
					reject(new AcejaxError(res));
				} else {
					if (json) {
						res.body = JSON.parse(res.body);
					}

					resolve(buildResponse(res));
				}
			});
		});

		req.on('error', reject);

		if (body) {
			if (isObject(body)) {
				req.setHeader('Content-Type', 'application/json');
			}

			req.write(isObject(body) ? JSON.stringify(body) : body);
		}

		if (form) {
			req.setHeader('Content-Type', 'application/x-www-form-urlencoded');
			req.write(isObject(form) ? new URLSearchParams(form).toString() : form);
		}

		req.end();
	});
};

acejax.get = (url, acejaxOptions) => acejax(url, {...acejaxOptions, method: 'get'});
acejax.post = (url, acejaxOptions) => acejax(url, {...acejaxOptions, method: 'post'});
acejax.put = (url, acejaxOptions) => acejax(url, {...acejaxOptions, method: 'put'});
acejax.delete = (url, acejaxOptions) => acejax(url, {...acejaxOptions, method: 'delete'});
acejax.patch = (url, acejaxOptions) => acejax(url, {...acejaxOptions, method: 'patch'});

export default acejax;

// Exports for common js support
module.exports = acejax;
module.exports.default = acejax;

import {URL} from 'url';

export default url => {
	const urlInstance = new URL(url);
	const options = {};

	for (const prop in urlInstance) {
		if (Reflect.has(urlInstance, prop)) {
			options[prop] = urlInstance[prop];
		}
	}

	return options;
};

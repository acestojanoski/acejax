import {responseKeys} from './constants';

class AcejaxError extends Error {
	constructor(res) {
		super(res.statusMessage);
		this.name = 'AcejaxError';

		for (const key of responseKeys) {
			this[key] = res[key];
		}
	}
}

export default AcejaxError;

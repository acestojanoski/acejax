import {responseKeys} from './constants';

export default res => {
	const response = {};

	for (const key of responseKeys) {
		response[key] = res[key];
	}

	return response;
};

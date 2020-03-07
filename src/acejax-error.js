class AcejaxError extends Error {
	constructor(response, body) {
		super(response.statusMessage);
		this.name = 'AcejaxError';
		this.statusCode = response.statusCode;
		this.statusMessage = response.statusMessage;
		this.headers = response.headers;
		this.rawHeaders = response.rawHeaders;
		this.httpVersion = response.httpVersion;
		this.body = body;
	}
}

export default AcejaxError;

type Method =
	| 'GET'
	| 'POST'
	| 'PUT'
	| 'PATCH'
	| 'HEAD'
	| 'DELETE'
	| 'OPTIONS'
	| 'TRACE'
	| 'get'
	| 'post'
	| 'put'
	| 'patch'
	| 'head'
	| 'delete'
	| 'options'
	| 'trace';

export interface AcejaxRequest {
	url: string;
	method?: Method;
	headers?: object;
	tiemout?: number;
	json?: boolean;
	body?: object | string | Buffer;
	form?: object | string;
}

export interface AcejaxResponse {
	readonly statusCode: number;
	readonly statusMessage: string;
	readonly headers: object;
	readonly rawHeaders: string[];
	readonly httpVersion: string;
	readonly body: string | object;
}

export interface AcejaxError extends Error, AcejaxResponse {}

interface Acejax {
	(options: AcejaxRequest): Promise<AcejaxResponse> | Promise<AcejaxError>;
	get(url: string, headers?: object): Promise<AcejaxResponse> | Promise<AcejaxError>;
	delete(url: string, headers?: object): Promise<AcejaxResponse> | Promise<AcejaxError>;
	post(
		url: string,
		body?: object | string,
		headers?: object
	): Promise<AcejaxResponse> | Promise<AcejaxError>;
	put(
		url: string,
		body?: object | string,
		headers?: object
	): Promise<AcejaxResponse> | Promise<AcejaxError>;
	patch(
		url: string,
		body?: object | string,
		headers?: object
	): Promise<AcejaxResponse> | Promise<AcejaxError>;
}

declare const acejax: Acejax;
export default acejax;

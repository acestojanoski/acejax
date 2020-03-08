declare module 'acejax' {
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

	interface AcejaxRequest {
		url: string;
		method?: Method;
		headers?: object;
		tiemout?: number;
		json?: boolean;
		body?: object | string;
		form?: object | string;
	}

	interface AcejaxResponse {
		readonly statusCode: number;
		readonly statusMessage: string;
		readonly headers: object;
		readonly rawHeaders: string[];
		readonly httpVersion: string;
		readonly body: string | object;
	}

	interface AcejaxError extends Error, AcejaxResponse {}

	function acejax(
		options: AcejaxRequest
	): Promise<AcejaxResponse> | Promise<AcejaxError>;

	function getRequest(
		url: string,
		headers?: object
	): Promise<AcejaxResponse> | Promise<AcejaxError>;

	function postRequest(
		url: string,
		body?,
		headers?
	): Promise<AcejaxResponse> | Promise<AcejaxError>;

	export default acejax;
	export {getRequest as get};
	export {postRequest as post};
	export {postRequest as put};
	export {getRequest as delete};
}

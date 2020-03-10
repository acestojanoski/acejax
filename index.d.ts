import {RequestOptions} from 'https';
import {URL} from 'url';

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

type RequestAndUrlOptions = RequestOptions & URL;

export interface AcejaxOptions extends RequestAndUrlOptions {
	json?: boolean;
	body?: object | string | Buffer;
	form?: object | string;
	method?: Method;
}

export interface AcejaxResponse {
	readonly statusCode: number;
	readonly statusMessage: string;
	readonly headers: object;
	readonly rawHeaders: string[];
	readonly httpVersion: string;
	readonly acejaxOptions: AcejaxOptions;
	readonly url: string;
	readonly body: string | object;
}

interface Acejax {
	(url: string, acejaxOptions: AcejaxOptions): Promise<AcejaxResponse>;
	get(url: string, acejaxOptions: AcejaxOptions): Promise<AcejaxResponse>;
	post(url: string, acejaxOptions: AcejaxOptions): Promise<AcejaxResponse>;
	put(url: string, acejaxOptions: AcejaxOptions): Promise<AcejaxResponse>;
	patch(url: string, acejaxOptions: AcejaxOptions): Promise<AcejaxResponse>;
	delete(url: string, acejaxOptions: AcejaxOptions): Promise<AcejaxResponse>;
}

declare const acejax: Acejax;
export default acejax;

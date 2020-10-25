import axios, { AxiosInstance } from 'axios';

/**
 * Service API base class - configures default settings/error handling for inheriting class
 */
export abstract class BaseService {
	protected readonly $http: AxiosInstance;

	protected constructor(controllerName: string, requestTimeout: number = 50000) {
		this.$http = axios.create({
			baseURL: `https://localhost:5001/api/${controllerName}/`,
			timeout: requestTimeout,
		});
	}
}

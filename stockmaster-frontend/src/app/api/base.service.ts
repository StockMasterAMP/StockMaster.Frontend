import axios, { AxiosInstance } from 'axios';

/**
 * Service API base class - configures default settings/error handling for inheriting class
 */
export abstract class BaseService {
	protected readonly $http: AxiosInstance;

	protected constructor(serviceName: string, requestTimeout: number = 50000) {
		this.$http = axios.create({
			headers: {
				'Content-Type': 'application/json',
			},
			baseURL: `http://localhost:5000/${serviceName}/`,
			timeout: requestTimeout,
		});
	}
}

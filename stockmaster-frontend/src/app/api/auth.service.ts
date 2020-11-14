import { AxiosResponse } from 'axios';
import { BaseService } from './base.service';
import { IAuthUser, ICredentials, IRegisterResponse } from '../store/auth/types';

/**
 * Auth API abstraction layer communication via Axios (typescript singleton pattern)
 */
class AuthService extends BaseService {
	private static _authService: AuthService;

	private constructor(serviceName: string) {
		super(serviceName);
	}

	public static get Instance(): AuthService {
		return this._authService || (this._authService = new this('identity'));
	}

	public async logoutAsync(): Promise<AxiosResponse> {
		return await this.$http.post('Logout');
	}

	public async loginAsync(credentials: ICredentials): Promise<IAuthUser> {
		return await this.$http.post<IAuthUser>('sign-in', credentials).then((response) => response.data);
	}

	public async registerAsync(credentials: ICredentials): Promise<IRegisterResponse | number> {
		return await this.$http
			.post<IRegisterResponse>('sign-up', credentials)
			.then((response) => {
				if (response.status === 201) {
					return response.status;
				}
			})
			.catch((error) => {
				return error.response.data;
			});
	}
}

export const AuthApi = AuthService.Instance;

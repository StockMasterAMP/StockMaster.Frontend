import { AxiosResponse } from 'axios';
import { BaseService } from './base.service';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../store/auth/types';
import Cookies from 'js-cookie';

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

    public async loginAsync(loginRequest: LoginRequest): Promise<Partial<LoginResponse>> {
        return await this.$http
            .post<LoginResponse>('sign-in', loginRequest)
            .then((response) => {
                let loginResponse: Partial<LoginResponse> = {
                    ...response.data,
                    statusCode: response.status,
                };
                return loginResponse;
            })
            .catch((error) => {
                let loginResponse: Partial<LoginResponse> = {
                    reason: error.response.data.reason,
                    code: error.response.data.code,
                    statusCode: error.response.status,
                };
                return loginResponse;
            });
    }

    public async registerAsync(registerRequest: RegisterRequest): Promise<Partial<RegisterResponse>> {
        return await this.$http
            .post<RegisterResponse>('sign-up', registerRequest)
            .then((response) => {
                let registerResponse: Partial<RegisterResponse> = {
                    statusCode: response.status,
                };
                return registerResponse;
            })
            .catch((error) => {
                let registerResponse: Partial<RegisterResponse> = {
                    reason: error.response.data.reason,
                    code: error.response.data.code,
                    statusCode: error.response.status,
                };
                return registerResponse;
            });
    }

    public async accessTokensRevoke(accessToken: string): Promise<AxiosResponse> {
        return await this.$http
            .post('access-tokens/revoke', { accessToken })
            .then((response) => {
                return response.status;
            })
            .catch((error) => {
                return error.status;
            });
    }

    public async refreshTokenRevoke(refreshToken: string): Promise<AxiosResponse> {
        return await this.$http
            .post('refresh-tokens/revoke', { refreshToken })
            .then((response) => {
                return response.status;
            })
            .catch((error) => {
                return error.status;
            });
    }

    public async getAboutMe(): Promise<AxiosResponse> {
        let token: string | undefined;
        Cookies.get('AccessToken') === 'undefined' ? (token = undefined) : (token = Cookies.get('AccessToken'));
        return await this.$http
            .get('/me', {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return error;
            });
    }
}

export const AuthApi = AuthService.Instance;

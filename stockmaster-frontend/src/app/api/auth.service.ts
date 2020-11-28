import { AxiosResponse } from 'axios';
import { BaseService } from './base.service';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../store/auth/types';

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
}

export const AuthApi = AuthService.Instance;

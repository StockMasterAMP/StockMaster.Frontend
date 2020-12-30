import Axios from 'axios';
import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';
import { RefreshTokensResponse } from '../store/auth/types';

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

        this.$http.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                const status = error.response ? error.response.status : null;
                let refreshToken: string | undefined;
                Cookies.get('RefreshToken') === 'undefined'
                    ? (refreshToken = undefined)
                    : (refreshToken = Cookies.get('RefreshToken'));
                if (status === 401 && refreshToken !== undefined) {
                    this.updateAuthenticationTokens(refreshToken).then((response) => {
                        Cookies.set('RefreshToken', response.refreshToken);
                        Cookies.set('AccessToken', response.accessToken);

                        error.config.headers = {
                            Authorization: `Bearer ${response.accessToken}`,
                        };

                        return this.$http.request(error.config);
                    });
                }

                return Promise.reject(error);
            },
        );
    }

    public async updateAuthenticationTokens(refreshToken: string): Promise<RefreshTokensResponse> {
        return await this.$http
            .post<RefreshTokensResponse>('refresh-tokens/use', { refreshToken })
            .then((response) => {
                let tokensResponse: Partial<RefreshTokensResponse> = {
                    ...response.data,
                    statusCode: response.status,
                };
                return tokensResponse;
            })
            .catch((error) => {
                return error.status;
            });
    }
}

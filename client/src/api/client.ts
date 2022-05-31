import Axios, { AxiosInstance} from 'axios';

// @TODO :: Extend api client to handle all crud operations
export interface IApiClient {
    get<TResponse>(path: string): Promise<TResponse>
}

class ApiClient implements IApiClient {
    private client: AxiosInstance;

    protected createAxiosClient(): AxiosInstance {
        return Axios.create({
            baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:5000/api' : 'https://spelling-bee.onrender.com/api',
            responseType: 'json' as const,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    constructor() {
        this.client = this.createAxiosClient();
    }

    async get<TResponse>(path: string): Promise<TResponse> {
        try {
            const response = await this.client.get<TResponse>(path);
            return response.data;
        } catch (err) {
            // @TODO :: Catch errors
            console.log('@@@ ERROR :: ', err);
        }

        return {} as TResponse;
    }
}

export default new ApiClient();
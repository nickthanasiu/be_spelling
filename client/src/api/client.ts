import Axios, { AxiosInstance} from 'axios';

// @TODO :: Extend api client to handle all crud operations
export interface IApiClient {
    get<TResponse>(path: string): Promise<TResponse>,
    post<T>(path: string, date: any): Promise<T>,
}

class ApiClient implements IApiClient {
    private client: AxiosInstance;

    protected createAxiosClient(): AxiosInstance {
        return Axios.create({
            baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:5000/api' : 'https://be-spelling.onrender.com/api',
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
        } catch (error) {
            throw error;
        }
    }

    async post<TResponse>(path: string, data: any): Promise<TResponse> {
        try{
            const response = await this.client.post<TResponse>(path, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default new ApiClient();
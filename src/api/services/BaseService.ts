import { APIRequestContext, APIResponse } from '@playwright/test';

export class BaseService {
    protected request: APIRequestContext;
    protected baseURL: string;

    constructor(request: APIRequestContext, baseURL: string) {
        this.request = request;
        this.baseURL = baseURL;
    }

    protected async get(endpoint: string, params?: { [key: string]: string | number | boolean }): Promise<APIResponse> {
        return this.request.get(`${this.baseURL}${endpoint}`, { params });
    }

    protected async post(endpoint: string, data: any): Promise<APIResponse> {
        return this.request.post(`${this.baseURL}${endpoint}`, {
            data,
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            }
        });
    }

    protected async put(endpoint: string, data: any): Promise<APIResponse> {
        return this.request.put(`${this.baseURL}${endpoint}`, {
            data,
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            }
        });
    }

    protected async delete(endpoint: string): Promise<APIResponse> {
        return this.request.delete(`${this.baseURL}${endpoint}`, {
            headers: {
                'accept': 'application/json'
            }
        });
    }
}

import { BaseService } from './BaseService';
import { APIResponse } from '@playwright/test';

export class UserService extends BaseService {
    async login(username: string, password: string): Promise<APIResponse> {
        return this.get('/user/login', { username, password });
    }
}

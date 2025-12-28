import { BaseService } from './BaseService';
import { APIResponse } from '@playwright/test';

export class StoreService extends BaseService {
    async placeOrder(order: object): Promise<APIResponse> {
        return this.post('/store/order', order);
    }
}

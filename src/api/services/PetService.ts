import { BaseService } from './BaseService';
import { APIResponse } from '@playwright/test';

export class PetService extends BaseService {
    async findByStatus(status: 'available' | 'pending' | 'sold'): Promise<APIResponse> {
        return this.get('/pet/findByStatus', { status });
    }

    async getById(petId: number): Promise<APIResponse> {
        return this.get(`/pet/${petId}`);
    }
}

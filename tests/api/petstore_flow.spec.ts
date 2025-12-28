import { test, expect } from '@playwright/test';
import { config } from '@api/config';
import { UserService } from '@api/services/UserService';
import { PetService } from '@api/services/PetService';
import { StoreService } from '@api/services/StoreService';

test.describe('Petstore API Flow', () => {
    let userService: UserService;
    let petService: PetService;
    let storeService: StoreService;

    test.beforeEach(async ({ request }) => {
        userService = new UserService(request, config.baseURL);
        petService = new PetService(request, config.baseURL);
        storeService = new StoreService(request, config.baseURL);
    });

    test('Complete Petstore User Flow', async () => {
        // 1. Login
        console.log('Step 1: Logging in...');
        const loginResponse = await userService.login('testuser', 'testpass');
        expect(loginResponse.ok(), 'Login should be successful').toBeTruthy();
        const loginBody = await loginResponse.json();
        expect(loginBody.code).toBe(200);

        // 2. List available pets
        console.log('Step 2: Listing available pets...');
        const petsResponse = await petService.findByStatus('available');
        expect(petsResponse.ok(), 'List pets should be successful').toBeTruthy();
        const pets = await petsResponse.json();
        expect(Array.isArray(pets)).toBeTruthy();
        expect(pets.length).toBeGreaterThan(0);

        // Pick a random pet from the list to test with
        const randomPet = pets[Math.floor(Math.random() * pets.length)];
        console.log(`Selected Pet ID: ${randomPet.id}`);

        // 3. Consult details of a specific pet
        console.log('Step 3: Getting pet details...');
        const petDetailsResponse = await petService.getById(randomPet.id);
        expect(petDetailsResponse.ok(), `Get pet details for ID ${randomPet.id} should be successful`).toBeTruthy();
        const petDetails = await petDetailsResponse.json();
        expect(petDetails.id).toBe(randomPet.id);

        // 4. Create an order for the pet
        console.log('Step 4: Placing order...');
        const orderPayload = {
            id: Math.floor(Math.random() * 1000), // Random Order ID
            petId: randomPet.id,
            quantity: 1,
            shipDate: new Date().toISOString(),
            status: 'placed',
            complete: true
        };

        const orderResponse = await storeService.placeOrder(orderPayload);
        expect(orderResponse.ok(), 'Order placement should be successful').toBeTruthy();
        const orderBody = await orderResponse.json();
        expect(orderBody.petId).toBe(randomPet.id);
        expect(orderBody.status).toBe('placed');

        console.log('Flow completed successfully.');
    });
});

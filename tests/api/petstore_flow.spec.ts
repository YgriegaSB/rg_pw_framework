import { test, expect } from '@src/fixtures/baseTest';
import { UserService } from '@api/services/UserService';
import { PetService } from '@api/services/PetService';
import { StoreService } from '@api/services/StoreService';

test.describe('Petstore API Challenge', () => {
    let userService: UserService;
    let petService: PetService;
    let storeService: StoreService;

    test.beforeEach(async ({ request, baseURL }) => {
        if (!baseURL) throw new Error('baseURL is required');
        userService = new UserService(request, baseURL);
        petService = new PetService(request, baseURL);
        storeService = new StoreService(request, baseURL);
    });

    test('Petstore Challenge: Full User Journey', async ({ logger }) => {
        let sharedPet: any;
        let orderId: number;

        await test.step('1. Login User', async () => {
            const response = await userService.login('testuser', 'testpass');
            expect(response.status(), 'Status should be 200').toBe(200);
            expect(response.headers()['content-type'], 'Content-Type should be JSON').toContain('application/json');

            const body = await response.json();
            expect(body.code, 'Response code should be 200').toBe(200);
            expect(body.message, 'Message should contains session/token').toMatch(/.+/);
            logger.info(`Login successful. Token/Session: ${body.message}`);
        });

        await test.step('2. List Available Pets', async () => {
            const response = await petService.findByStatus('available');
            expect(response.status()).toBe(200);

            const pets = await response.json();
            expect(Array.isArray(pets), 'Response should be an array').toBeTruthy();
            expect(pets.length, 'Should have at least one pet').toBeGreaterThan(0);

            const firstPet = pets[0];
            expect(firstPet.status).toBe('available');

            sharedPet = pets[Math.floor(Math.random() * pets.length)];
            logger.info(`Selected random pet: ${sharedPet.id} (${sharedPet.name})`);
        });

        await test.step('3. Get Pet Details', async () => {
            expect(sharedPet, 'Precondition: Must have a pet from previous step').toBeDefined();

            const response = await petService.getById(sharedPet.id);
            expect(response.status()).toBe(200);

            const details = await response.json();
            expect(details.id).toBe(sharedPet.id);
            expect(details.name).toBe(sharedPet.name);

            logger.info(`Verified details for pet ${details.id}`);
        });

        await test.step('4. Create Order', async () => {
            expect(sharedPet, 'Precondition: Must have a pet from previous step').toBeDefined();

            const orderPayload = {
                id: Math.floor(Math.random() * 1000),
                petId: sharedPet.id,
                quantity: 1,
                shipDate: new Date().toISOString(),
                status: 'placed',
                complete: true
            };

            const response = await storeService.placeOrder(orderPayload);
            expect(response.status()).toBe(200);

            const order = await response.json();
            expect(order.petId).toBe(orderPayload.petId);
            expect(order.quantity).toBe(orderPayload.quantity);
            expect(order.status).toBe(orderPayload.status);

            orderId = order.id;
            logger.info(`Order created: ${order.id} for Pet: ${order.petId}`);
        });
    });

});

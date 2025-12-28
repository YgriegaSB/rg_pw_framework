import { test, expect } from '@src/fixtures/baseTest';
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

    test('Complete Petstore User Flow', async ({ logger }) => {
        logger.info('Step 1: Logging in...');
        await test.step('Login', async () => {
            const loginResponse = await userService.login('testuser', 'testpass');
            if (!loginResponse.ok()) {
                logger.error(`Login failed with status: ${loginResponse.status()}`);
            }
            expect(loginResponse.ok(), 'Login should be successful').toBeTruthy();
            const loginBody = await loginResponse.json();
            logger.debug(`Login response: ${JSON.stringify(loginBody)}`);
            expect(loginBody.code).toBe(200);
        });

        logger.info('Step 2: Listing available pets...');
        let pets: any[];
        await test.step('List Pets', async () => {
            const petsResponse = await petService.findByStatus('available');
            expect(petsResponse.ok(), 'List pets should be successful').toBeTruthy();
            pets = await petsResponse.json();
            expect(Array.isArray(pets)).toBeTruthy();
            expect(pets.length).toBeGreaterThan(0);
            logger.info(`Found ${pets.length} available pets`);
        });

        const randomPet = pets![Math.floor(Math.random() * pets!.length)];
        logger.info(`Selected Pet ID: ${randomPet.id}`);

        logger.info('Step 3: Getting pet details...');
        await test.step('Get Pet Details', async () => {
            const petDetailsResponse = await petService.getById(randomPet.id);
            expect(petDetailsResponse.ok(), `Get pet details for ID ${randomPet.id} should be successful`).toBeTruthy();
            const petDetails = await petDetailsResponse.json();
            expect(petDetails.id).toBe(randomPet.id);
            logger.debug(`Pet details: ${JSON.stringify(petDetails)}`);
        });

        logger.info('Step 4: Placing order...');
        await test.step('Place Order', async () => {
            const orderPayload = {
                id: Math.floor(Math.random() * 1000),
                petId: randomPet.id,
                quantity: 1,
                shipDate: new Date().toISOString(),
                status: 'placed',
                complete: true
            };

            logger.debug(`Order payload: ${JSON.stringify(orderPayload)}`);
            const orderResponse = await storeService.placeOrder(orderPayload);
            expect(orderResponse.ok(), 'Order placement should be successful').toBeTruthy();
            const orderBody = await orderResponse.json();
            expect(orderBody.petId).toBe(randomPet.id);
            expect(orderBody.status).toBe('placed');
            logger.info(`Order placed successfully. Order ID: ${orderBody.id}`);
        });

        logger.info('Flow completed successfully.');
    });
});

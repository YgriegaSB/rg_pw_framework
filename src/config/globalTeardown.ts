import { DatabaseConnection } from './dbConn';

async function globalTeardown() {
    console.log('--- GLOBAL TEARDOWN START ---');
    const db = DatabaseConnection.getInstance();
    await db.close();
    console.log('--- GLOBAL TEARDOWN END ---');
}

export default globalTeardown;

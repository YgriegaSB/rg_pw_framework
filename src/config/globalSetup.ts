import { DatabaseConnection } from './dbConn';

async function globalSetup() {
    console.log('--- GLOBAL SETUP START ---');
    const db = DatabaseConnection.getInstance();
    // try {
    //     await db.connect();
    // } catch (error) {
    //     console.error('Fatal Error: Failed to connect to DB in Global Setup');
    //     process.exit(1);
    // }
    console.log('Warning: DB Connection is currently disabled in Global Setup.');
    console.log('--- GLOBAL SETUP END ---');
}

export default globalSetup;

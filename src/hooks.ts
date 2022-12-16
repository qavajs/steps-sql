import { After, Before } from '@cucumber/cucumber';
import { DBClient } from './DBClient';

declare global {
    var config: any;
    var dbClient: DBClient;
}

Before(async function () {
    global.dbClient = config.dbClient;
    await dbClient.waitForConnection();
});

After(async function () {
    if (global.dbClient) {
        await dbClient.close();
    }
});

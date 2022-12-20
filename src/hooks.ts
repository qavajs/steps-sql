import { After, Before } from '@cucumber/cucumber';
import { DBClient } from './clients/DBClient';

declare global {
    var config: any;
    var dbClients: {
        [prop: string]: DBClient
    };
}

Before(async function () {
    global.dbClients = config.dbClients;
    for (const prop in dbClients) {
        await dbClients[prop].connect();
    }
});

After(async function () {
    for (const prop in dbClients) {
        await dbClients[prop].close();
    }
});

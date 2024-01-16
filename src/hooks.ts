import { AfterAll, Before } from '@cucumber/cucumber';
import DBClient from './clients/DBClient';

declare global {
    var config: any;
    var dbClients: {
        [prop: string]: DBClient
    };
}

Before({name: 'Load DB Clients'}, async function () {
    global.dbClients = config.dbClients ?? {};
});

AfterAll(async function () {
    for (const prop in dbClients) {
        await dbClients[prop].close();
    }
});

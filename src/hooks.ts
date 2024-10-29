import { AfterAll, Before } from '@cucumber/cucumber';
import { IQavajsDBWorld } from './IQavajsDBWorld';
import DBClient from './clients/DBClient';

let dbClients: Record<string, DBClient> = {}
Before({name: 'Load DB Clients'}, async function (this: IQavajsDBWorld) {
    this.dbClients = dbClients = this.config.dbClients ?? {};
});

AfterAll(async function () {
    for (const prop in dbClients) {
        await dbClients[prop].close();
    }
});

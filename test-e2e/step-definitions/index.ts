import { Before, Then } from '@cucumber/cucumber';
import memory from '@qavajs/memory';
import { expect } from "chai";
import DBClient from '../../src/clients/DBClient';

declare global {
    var config: any;
    var dbClients: {
        [prop: string]: DBClient
    };
}

Before(function () {
    for (const db in dbClients) {
        // @ts-ignore
        dbClients[db].executions = [];
    }
});

Then('I expect {string} memory value to be equal {string}', async function(actual, expected) {
    const actualValue = memory.getValue(actual);
    const expectedValue = memory.getValue(expected);
    expect(expectedValue).to.eql(actualValue);
});

Then('I expect dummy {string} client {string} property to be equal {string}', async function(db, prop, expected) {
    const expectedValue = memory.getValue(expected);
    // @ts-ignore
    expect(dbClients[db][prop]).to.eql(expectedValue);
});



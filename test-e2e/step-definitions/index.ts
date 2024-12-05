import { Before, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import { IQavajsDBWorld } from '../../src/IQavajsDBWorld';

Before(function (this: IQavajsDBWorld) {
    for (const db in this.dbClients) {
        //@ts-ignore
        this.dbClients[db].executions = [];
    }
});

Then('I expect {string} memory value to be equal {string}', async function(actual, expected) {
    const actualValue = await this.getValue(actual);
    const expectedValue = await this.getValue(expected);
    expect(expectedValue).to.eql(actualValue);
});

Then('I expect dummy {string} client {string} property to be equal {string}', async function(db, prop, expected) {
    const expectedValue = await this.getValue(expected);
    // @ts-ignore
    expect(this.dbClients[db][prop]).to.eql(expectedValue);
});



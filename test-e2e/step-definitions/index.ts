import { Then, When, After } from '@cucumber/cucumber';
import memory from '@qavajs/memory';
import { expect } from "chai";

declare global {
    var config: any;
}

Then('I expect {string} memory value to be equal {string}', async function(actual, expected) {
    const actualValue = memory.getValue(actual);
    const expectedValue = memory.getValue(expected);
    expect(expectedValue).to.eql(actualValue);
});

Then('I expect dummy client {string} property to be equal {string}', async function(prop, expected) {
    const expectedValue = memory.getValue(expected);
    // @ts-ignore
    expect(dbClient[prop]).to.eql(expectedValue);
});



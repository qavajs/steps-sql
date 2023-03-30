import { MySQLClient, PgClient } from '../clients.js'
import { test, expect } from '@jest/globals';
test.each([
    MySQLClient,
    PgClient
])('db client', (classConstructor) => {
    console.log(classConstructor)
    expect(classConstructor).toBeInstanceOf(Function);
});

import { When } from '@cucumber/cucumber';
import memory from '@qavajs/memory';
import { DBClient } from './clients/DBClient';

function getDBClient(clients: any, clientName: string): DBClient {
    const client = dbClients[clientName];
    if (!client) throw new Error(`${clientName} db is not set`);
    return client
}

async function executeQuery(queryTemplate: string, memoryKey?: string | null, db: string = 'default') {
    const query: string = await memory.getValue(queryTemplate);
    const dbName: string = await memory.getValue(db);
    const client = getDBClient(dbClients, dbName);
    const result = await client.execute(query);
    if (memoryKey) memory.setValue(memoryKey, result);
}

/**
 * Execute sql query in default db provided as multiline string
 * @param {string} query - query to execute
 * @example
 * When I execute SQL query:
 * """
 * select smth from some_table where smth = 42
 * """
 */
When('I execute SQL query:', (query: string) => executeQuery(query));

/**
 * Execute sql query in default db provided as multiline string
 * @param {string} query - query to execute
 * @param {string} memoryKey - memory key to save result
 * @example
 * When I execute SQL query and save result as 'sqlResult':
 * """
 * select smth from some_table where smth = 42
 * """
 */
When('I execute SQL query and save result as {string}:',
    (memoryKey: string, query: string) => executeQuery(query, memoryKey),
);

/**
 * Execute sql query in default db provided as single line
 * @param {string} query - query to execute
 * @example
 * When I execute 'select smth from some_table where smth = 42' SQL query
 */
When('I execute {string} SQL query', (query: string) => executeQuery(query));

/**
 * Execute sql query in default provided as multiline string
 * @param {string} query - query to execute
 * @param {string} memoryKey - memory key to save result
 * @example
 * When I execute 'select * from some_table' SQL query and save result as 'sqlResult'
 */
When('I execute {string} SQL query and save result as {string}',
    (query: string, memoryKey: string) => executeQuery(query, memoryKey),
);

/**
 * Execute sql query in db provided as multiline string
 * @param {string} query - query to execute
 * @param {string} db - db name
 * @example
 * When I execute SQL query in 'other' db:
 * """
 * select smth from some_table where smth = 42
 * """
 */
When('I execute SQL query in {string} db:', (db: string, query: string) => executeQuery(query, null, db));

/**
 * Execute sql query provided as multiline string
 * @param {string} query - query to execute
 * @param {string} db - db name
 * @param {string} memoryKey - memory key to save result
 * @example
 * When I execute SQL query in 'other' db and save result as 'sqlResult':
 * """
 * select smth from some_table where smth = 42
 * """
 */
When('I execute SQL query in {string} db and save result as {string}:',
    (db: string, memoryKey: string, query: string) => executeQuery(query, memoryKey, db)
);

/**
 * Execute sql query provided as single line
 * @param {string} query - query to execute
 * @param {string} db - db name
 * @example
 * When I execute 'select smth from some_table where smth = 42' SQL query in 'other' db
 */
When('I execute {string} SQL query in {string} db', (query: string, db: string) => executeQuery(query, null, db));

/**
 * Execute sql query provided as multiline string
 * @param {string} query - query to execute
 * @param {string} db - db name
 * @param {string} memoryKey - memory key to save result
 * @example
 * When I execute 'select * from some_table' SQL query in 'other' db and save result as 'sqlResult'
 */
When('I execute {string} SQL query in {string} db and save result as {string}',
    (query: string, db: string, memoryKey: string) => executeQuery(query, memoryKey, db)
);

import { When } from '@cucumber/cucumber';
import DBClient from './clients/DBClient';
import { IQavajsDBWorld } from './IQavajsDBWorld';

async function getDBClient(clients: any, clientName: string): Promise<DBClient> {
    const client = clients[clientName];
    if (!client) throw new Error(`${clientName} db is not set`);
    if (!client.connection) await client.connect();
    return client
}

async function executeQuery(world: IQavajsDBWorld, queryTemplate: string, memoryKey?: string | null, db: string = 'default') {
    const query: string = await world.getValue(queryTemplate);
    const dbName: string = await world.getValue(db);
    const client = await getDBClient(world.dbClients, dbName);
    const result = await client.execute(query);
    if (memoryKey) world.setValue(memoryKey, result);
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
When('I execute SQL query:', async function (this: IQavajsDBWorld, query: string) {
    await executeQuery(this, query)
});

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
    async function (this: IQavajsDBWorld, memoryKey: string, query: string) {
        await executeQuery(this, query, memoryKey)
    },
);

/**
 * Execute sql query in default db provided as single line
 * @param {string} query - query to execute
 * @example
 * When I execute 'select smth from some_table where smth = 42' SQL query
 */
When('I execute {string} SQL query', async function (this: IQavajsDBWorld, query: string) {
    await executeQuery(this, query)
});

/**
 * Execute sql query in default provided as multiline string
 * @param {string} query - query to execute
 * @param {string} memoryKey - memory key to save result
 * @example
 * When I execute 'select * from some_table' SQL query and save result as 'sqlResult'
 */
When('I execute {string} SQL query and save result as {string}',
    async function (this: IQavajsDBWorld, query: string, memoryKey: string) {
        await executeQuery(this, query, memoryKey)
    },
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
When('I execute SQL query in {string} db:', async function (this: IQavajsDBWorld, db: string, query: string) {
    await executeQuery(this, query, null, db)
});

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
    async function (this: IQavajsDBWorld, db: string, memoryKey: string, query: string) {
        await executeQuery(this, query, memoryKey, db)
    }
);

/**
 * Execute sql query provided as single line
 * @param {string} query - query to execute
 * @param {string} db - db name
 * @example
 * When I execute 'select smth from some_table where smth = 42' SQL query in 'other' db
 */
When('I execute {string} SQL query in {string} db', async function (this: IQavajsDBWorld, query: string, db: string) {
    await executeQuery(this, query, null, db)
});

/**
 * Execute sql query provided as multiline string
 * @param {string} query - query to execute
 * @param {string} db - db name
 * @param {string} memoryKey - memory key to save result
 * @example
 * When I execute 'select * from some_table' SQL query in 'other' db and save result as 'sqlResult'
 */
When('I execute {string} SQL query in {string} db and save result as {string}',
    async function (this: IQavajsDBWorld, query: string, db: string, memoryKey: string) {
        await executeQuery(this, query, memoryKey, db)
    }
);

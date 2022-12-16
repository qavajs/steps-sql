import { When } from '@cucumber/cucumber';
import memory from '@qavajs/memory';

async function executeQuery(queryTemplate: string) {
    const query: string = await memory.getValue(queryTemplate);
    await dbClient.execute(query);
}

async function executeQueryAndSaveResult(memoryKey: string, queryTemplate: string) {
    const query: string = await memory.getValue(queryTemplate);
    memory.setValue(memoryKey, await dbClient.execute(query));
}

/**
 * Execute sql query provided as multiline string
 * @param {string} queryTemplate - query to execute
 * @example
 * When I execute SQL query:
 * """
 * select smth from some_table where smth = 42
 * """
 */
When('I execute SQL query:', executeQuery);

/**
 * Execute sql query provided as multiline string
 * @param {string} queryTemplate - query to execute
 * @example
 * When I execute SQL query and save result as 'sqlResult':
 * """
 * select smth from some_table where smth = 42
 * """
 */
When('I execute SQL query and save result as {string}:', executeQueryAndSaveResult);

/**
 * Execute sql query provided as single line
 * @param {string} queryTemplate - query to execute
 * @example
 * When I execute 'select smth from some_table where smth = 42' SQL query
 */
When('I execute {string} SQL query', executeQuery);

/**
 * Execute sql query provided as multiline string
 * @param {string} queryTemplate - query to execute
 * @example
 * When I execute 'select * from some_table' SQL query and save result as 'sqlResult'
 */
When('I execute {string} SQL query and save result as {string}',
    (queryTemplate, memoryKey) => executeQueryAndSaveResult(memoryKey, queryTemplate)
);

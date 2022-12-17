import { DBClient } from './DBClient';
import mysql2, { Connection } from 'mysql2/promise';

export class MySQLClient implements DBClient {

    public connection: Connection;

    constructor(config: any) {
        this.connection = mysql2.createConnection(config);
    }

    async close(): Promise<void> {}

    async execute(query: string): Promise<Array<Array<any>>> {
        return this.connection.query(query);
    }

    async waitForConnection(): Promise<void> {
        this.connection = await this.connection;
    }

}

import { DBClient } from './DBClient';
import mysql2, { Connection } from 'mysql2/promise';

export class MySQLClient implements DBClient {

    public connection: Connection | null = null;
    private readonly config: any;
    private readonly CONNECTION_ERROR = new Error('Connection is not established! Call connect method!');

    constructor(config: any) {
        this.config = config;
    }

    async close(): Promise<void> {
        if (!this.connection) throw this.CONNECTION_ERROR;
        await this.connection.end();
    }

    async execute(query: string): Promise<Array<Array<any>>> {
        if (!this.connection) throw this.CONNECTION_ERROR;
        const [results] = await this.connection.query(query);
        return results as any
    }

    async connect(): Promise<void> {
        this.connection = await mysql2.createConnection(this.config);
    }

}

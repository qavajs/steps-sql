import DBClient from './DBClient';
import { Client } from 'pg';

export default class PgClient implements DBClient {

    public connection: Client | null = null;
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
        const { rows } = await this.connection.query(query);
        return rows
    }

    async connect(): Promise<void> {
        this.connection = await new Client(this.config);
        await this.connection.connect();
    }

}

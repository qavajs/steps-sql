import DBClient from '../../src/clients/DBClient';

export class DummyDBClient implements DBClient {
    public isClosed: boolean = true;
    public executions: any[] = [];
    public connection: boolean = false;

    constructor(config: any) {}

    async close(): Promise<void> {
        this.isClosed = true;
        this.executions = [];
    }

    async execute(query: string): Promise<Array<Array<any>>> {
        if (!this.connection) throw new Error('not connected');
        this.executions.push(query);
        if (query.toLowerCase() !== 'select * from some_table') return []
        return [
            [1,2,3],
            ['uno', 'dos', 'tres']
        ]
    }

    async connect(): Promise<void> {
        this.connection = true;
        this.isClosed = false;
        this.executions = [];
    }

}

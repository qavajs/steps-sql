import { DBClient } from '../../src/clients/DBClient';

export class DummyDBClient implements DBClient {
    public isClosed: boolean;
    public executions: any[];
    constructor(config: any) {
        this.isClosed = false;
        this.executions = [];
    }

    async close(): Promise<void> {
        this.isClosed = true;
        this.executions = [];
    }

    async execute(query: string): Promise<Array<Array<any>>> {
        this.executions.push(query);
        if (query.toLowerCase() !== 'select * from some_table') return []
        return [
            [1,2,3],
            ['uno', 'dos', 'tres']
        ]
    }

    connect(): Promise<void> {
        return Promise.resolve();
    }

}

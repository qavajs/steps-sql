export default interface DBClient {
    connection: any;
    /**
     * Establish connection
     */
    connect(): Promise<void>;

    /**
     * Close connection
     */
    close(): Promise<void>;

    /**
     * Execute query
     * @param {string} query - query to execute
     * @return Promise<Array<any>>
     * Promise that resolves into array of rows
     */
    execute(query: string): Promise<Array<any>>;
}

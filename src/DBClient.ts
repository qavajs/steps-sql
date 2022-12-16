export interface DBClient {
    /**
     * Wait for connection is established
     */
    waitForConnection(): Promise<void>;

    /**
     * Close connection
     */
    close(): Promise<void>;

    /**
     * Execute query
     * @param {string} query - query to execute
     * @return Promise<Array<Array<any>>>
     * Promise that resolves into array of rows
     */
    execute(query: string): Promise<Array<Array<any>>>;
}

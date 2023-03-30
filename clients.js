module.exports = {
    get MySQLClient() { return require('./lib/clients/MySQLClient').default },
    get PgClient() { return require('./lib/clients/PgClient').default },
}

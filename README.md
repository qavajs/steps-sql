# @qavajs/steps-sql
Step library to work with relational databases

## installation
`npm install @qavajs/steps-sql`

## configuration
```javascript
const { MySQLClient } = require('@qavajs/steps-sql');
module.exports = {
    default: {
        require: [
            '@qavajs/steps-sql'
        ],
        // provide map contains client that implemennts DBClient interface
        // if only one client exist it can be defined as default property
        dbClients: {
            default: new MySQLClient({
                host: 'http://127.0.0.1',
                port: 3306,
                database: 'qavajsdb',
                user: 'username',
                password: 'password'
            }),
            other: new MySQLClient({
                host: 'http://127.0.0.1',
                port: 3306,
                database: 'qavajsdb2',
                user: 'username',
                password: 'password'
            }),
        }
    }
}
```

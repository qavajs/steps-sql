# @qavajs/steps-sql
Step library to work with relational databases

## Installation
`npm install @qavajs/steps-sql`

## Configuration
```typescript
import { MySQLClient, PgClient } from '@qavajs/steps-sql/clients';
export default {
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
        pg: new MySQLClient({
            host: 'http://127.0.0.1',
            port: 3306,
            database: 'qavajsdb2',
            username: 'username',
            password: 'password'
        }),
    }
}
```

## Implemented Clients
Corresponding DB packages need to be installed separately

| client      | description                                                         |
|-------------|---------------------------------------------------------------------|
| MySQLClient | MySQL client. Works on top of https://www.npmjs.com/package/mysql2  |
| PgClient    | PostgreSQL client. Works on top of https://www.npmjs.com/package/pg |


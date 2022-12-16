# @qavajs/steps-sql
Step library to work with relational databases

## installation
`npm install @qavajs/steps-sql`

## configuration
```javascript
const { MySqlClient } = require('@qavajs/steps-sql');
module.exports = {
    default: {
        require: [
            '@qavajs/steps-sql'
        ],
        // provide client implementing DBClient interface 
        dbClient: new MySqlClient({
            host: 'http://127.0.0.1',
            port: 3306,
            database: 'qavajsdb',
            user: 'username',
            password: 'password'
        })
    }
}
```

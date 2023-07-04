const Pool = require('pg').Pool;

require('dotenv').config()

console.log(process.env)

const pool = new Pool({
    user: process.env.UNAME,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.DBPORT,
    database: 'SkinnerFlowDB'
})

module.exports = pool
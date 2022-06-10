const Pool = require("pg").Pool

const pool = new Pool({
    user: "postgres",
    password: "baxter123",
    host: "localhost",
    port: 5432,
    database: "loginsys"
});

module.exports = pool;
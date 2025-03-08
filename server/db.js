const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres.ohyowqqwakrtckiohxbs",
    password: "1spsBEMANrKvBf9i",
    host: "aws-0-ap-southeast-1.pooler.supabase.com",
    port: 6543,
    database: "postgres"
});

module.exports = pool;
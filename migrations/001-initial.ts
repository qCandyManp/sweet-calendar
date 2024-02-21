const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
})

exports.up = async () => {
    await client.connect();
    await client.query('CREATE TABLE test (id SERIAL PRIMARY KEY, name VARCHAR(50))');
    await client.end();
};

exports.down = async () => {
    await client.connect();
    await client.query('DROP TABLE test');
    await client.end();
};
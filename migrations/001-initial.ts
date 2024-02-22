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
    await client.query('CREATE EXTENSION IF NOT EXISTS pgcrypto');
    await client.query(`
        CREATE TABLE users (
            uuid UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
        )
    `);
    await client.query(`
        CREATE TABLE calendars (
            uuid UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            owner UUID REFERENCES users(uuid)
        )
    `);
    await client.query(`
        CREATE TABLE appointments (
            uuid UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            calendar UUID REFERENCES calendars(uuid),
            date TIMESTAMP NOT NULL
        )
    `);
    await client.end();
};

exports.down = async () => {
    await client.connect();
    await client.query('DROP TABLE users');
    await client.query('DROP TABLE calendars');
    await client.query('DROP TABLE appointments');
    await client.end();
};
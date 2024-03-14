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
        CREATE TABLE IF NOT EXISTS users (
            uuid UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            verified BOOLEAN DEFAULT FALSE,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
        )
    `);
    /**
     * The password is "test"
     */
    await client.query(`
        INSERT INTO users (uuid, email, password, verified) VALUES ('189b7141-ee56-4f75-9a5d-b518d271d0c2', 'test@test.de', '$2a$10$SAPr4qnJ0yFgIWe0IlcQp.o.qLeJ4aoCLz7yuGVrC0mZbp4dxoVii', TRUE)
    `);
    await client.query(`
        CREATE TABLE IF NOT EXISTS appointments (
            uuid UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            date TIMESTAMP NOT NULL
        )
    `);
    await client.end();
};

exports.down = async () => {
    await client.connect();
    await client.query('DROP TABLE appointments');
    await client.query('DROP TABLE users');
    await client.end();
};
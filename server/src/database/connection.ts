import { Client } from 'pg';

export const client = new Client({
    host: 'localhost',
    user: 'postgres',
    password: 'docker',
    database: 'indexes',
});

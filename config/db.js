require('dotenv').config();
const env = process.env;

local = {
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'hansung',
    database: 'KrHangMan'
}
dev = {
    host: env.DB_URL,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: 'Hangman'
}
real = {
    host: env.DB_URL,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: 'Hangman',
}

module.exports = { local, dev, real };
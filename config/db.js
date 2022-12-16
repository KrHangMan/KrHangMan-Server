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
    host: env.DB_HOST,
    port: '3306',
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_PASSWORD
}
real = {
    host: env.DB_HOST,
    port: '3306',
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: ''
}

module.exports = { local, dev, real };
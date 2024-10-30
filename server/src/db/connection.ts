import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
    // prefer to use .env for environment variables to hide passwords
    host: process.env.HOST || 'localhost',
    port: 3306,
    user: process.env.USER || 'root',
    password: process.env.PASSWORD || 'carlos62',
    database: process.env.DATABASE || 'lottery',
});

export default pool;
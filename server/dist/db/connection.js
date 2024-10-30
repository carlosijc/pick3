"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pool = promise_1.default.createPool({
    // prefer to use .env for environment variables to hide passwords
    host: process.env.HOST || 'localhost',
    port: 3306,
    user: process.env.USER || 'root',
    password: process.env.PASSWORD || 'carlos62',
    database: process.env.DATABASE || 'lottery',
});
exports.default = pool;

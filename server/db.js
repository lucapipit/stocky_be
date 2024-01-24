import dotenv from "dotenv";//.env file config
import mysql from 'mysql';
dotenv.config();

console.log(process.env.DB_HOST);
//db connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PSSW,
    database: process.env.DB_NAME,
    insecureAuth: true
});

export default db
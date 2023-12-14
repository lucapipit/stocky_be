// connection db
import mysql from "mysql";
import dotenv from "dotenv";//.env file config
dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    insecureAuth : true
});

export default db
const express = require('express');
const app = express();
import cors from 'cors';
const dotenv = require('dotenv');
import mysql from 'mysql';
import ActiveUser from './routes/ActiveUser.js';
import Annunci from './routes/Annunci.js';
import Professional from './routes/Professional.js';


const port = 5050;

dotenv.config();
app.use(cors());
app.use(express.json());


//db connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PSSW,
    database: process.env.DB_NAME,
   insecureAuth : true

});


//routes
app.use('/', ActiveUser);
app.use('/', Annunci);
app.use('/', Professional);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});




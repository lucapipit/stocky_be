import express from "express";
import cors from 'cors';
const app = express();

//routes
import activeUsers from './routes/activeUsers.js';
import announcements from './routes/announcements.js';
import professionals from './routes/professionals.js';




const port = 5050;

app.use(express.json());
app.use(cors());



//routes
app.use("/uploads", express.static("uploads"));
app.use('/', activeUsers);
app.use('/',  announcements);
app.use('/', professionals);



app.listen(port, () => {console.log(`Server running on port ${port}`)});




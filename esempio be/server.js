import express from "express";
const app = express();
import cors from "cors";

const PORT = 5050;
/* require("dotenv").config(); */

import services from "./routes/services.js";
import teams from "./routes/teams.js";
import users from "./routes/users.js";
import fairs from "./routes/fairs.js";
import visits from "./routes/visits.js";

app.use(express.json());
app.use(cors());
app.use("/", services);
app.use("/", teams);
app.use("/", users);
app.use("/", fairs);
app.use("/", visits);


app.listen(PORT, () => console.log(`server avviato nella porta ${PORT}`));
/* app.listen(); */
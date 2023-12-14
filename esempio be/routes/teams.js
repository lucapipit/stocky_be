import db from "../db.js";
import express from "express";
const router = express.Router();

router.get("/teams", (req, res) => {
    
    db.query("SELECT * FROM teams", (err, data) => {
        if (err) {
            res.status(400).json({ message: err.message });
        } else {
            res.json(data);
        }
    });
})

export default router
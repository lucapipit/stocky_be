import db from "../db.js";
import express from "express";
const router = express.Router();

router.get("/demproducts", (req, res) => {

    db.query("SELECT * FROM dem_products", (err, data) => {
        if (err) {
            res.status(400).json({ message: err.message });
        } else {
            res.json(data);
        }
    });
})

router.get("/allproducts", (req, res) => {
    const q = req.query.category;
    
    if (q == "all services") {
        db.query(`SELECT * FROM all_products`, (err, data) => {
            if (err) {
                res.status(400).json({ message: err.message });
            } else {
                res.json(data);
            }
        });
    } else {
        db.query(`SELECT * FROM all_products WHERE category = '${q}'`, (err, data) => {
            if (err) {
                res.status(400).json({ message: err.message });
            } else {
                res.json(data);
            }
        });
    }
})


router.get("/product", (req, res) => {
    const q = req.query.id;
    
        db.query(`SELECT * FROM all_products WHERE id = '${q}'`, (err, data) => {
            if (err) {
                res.status(400).json({ message: err.message });
            } else {
                res.json(data);
            }
        });
    
})

export default router
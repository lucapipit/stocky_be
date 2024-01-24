import express from "express";
import db from "../db.js";
import jwt from "jsonwebtoken";
const router = express.Router();

router.get('/professionals',async (req, res) => {
    const authorization = req.headers.authorization;
    if (authorization) {
        const q = 'SELECT * FROM professional'
        db.query(q, async (err, data) => {
            if (err) {
                res.status(400).json({ message: err.message });
            } else {
                res.status(200).json(data);
            }
        })
    }
}
);

router.get('/professional/:id',async (req, res) => {
    const authorization = req.headers.authorization;
    if (authorization) {
        const q = `SELECT * FROM professional WHERE id = ${req.params.id}`
        db.query(q, async (err, data) => {
            if (err) {
                res.status(400).json({ message: err.message });
            } else {
                res.status(200).json(data);
            }
        })
    }
}
);

router.post('/createprofessional',async (req, res) => {
    try {
        const sqlPost = `INSERT INTO professional
        (name, surname, email, password, phone, address, city, cap, province, country, role, description, profile_picture) 
        
        VALUES ('${req.body.name}', '${req.body.surname}', '${req.body.email}', '${req.body.password}', '${req.body.phone}', 
        '${req.body.address}', '${req.body.city}', '${req.body.cap}', '${req.body.province}', '${req.body.country}', 
        '${req.body.role}', '${req.body.description}', '${req.body.profile_picture}')`
        db.query(sqlPost, (err, data) => {
            if (err) {
                console.log("Error: ", err, ". An error occurred");
                res.status(400).json({ message: err.message });
            } else {
                console.log("Succesfully insert into db!");
                res.status(200).json({ message: "Professional succesfully created" });
            }
        })
    } catch (error) {
        console.error(error)
    }
}
);

router.delete('/professional/:id',async (req, res) => {
    try {
        const sqlPost = `DELETE FROM professional WHERE id = '${req.params.id}'`
        db.query(sqlPost, (err, data) => {
            if (err) {
                console.log("Error: ", err, ". An error occurred");
                res.status(400).json({ message: err.message });
            } else {
                console.log("Succesfully delete from db!");
                res.status(200).json({ message: "Professional succesfully deleted" });
            }
        })
    } catch (error) {
        console.error(error)
    }
}
);

router.put('/professional/:id',async (req, res) => {
    try {
        const sqlPost = `UPDATE professional SET name = '${req.body.name}', surname = '${req.body.surname}', email = '${req.body.email}', password = '${req.body.password}', 
        phone = '${req.body.phone}', address = '${req.body.address}', city = '${req.body.city}', cap = '${req.body.cap}', province = '${req.body.province}', country = '${req.body.country}', role = '${req.body.role}', description = '${req.body.description}', profile_picture = '${req.body.profile_picture}' WHERE id = '${req.params.id}'`
        db.query(sqlPost, (err, data) => {
            if (err) {
                console.log("Error: ", err, ". An error occurred");
                res.status(400).json({ message: err.message });
            } else {
                console.log("Succesfully update db!");
                res.status(200).json({ message: "Professional succesfully updated" });
            }
        })
    } catch (error) {
        console.error(error)
    }
}
);

export default router;


import db from "../db.js";
import express from "express";
const router = express.Router();

router.get("/allvisits", (req, res) => {
    try {
        const q = req.query.idfair;
        const z = req.query.createdBy;
        const authorization = req.headers.authorization;

        if (authorization) {
            const sql = z === "all" ? `SELECT * FROM visits WHERE idfair=${q} ORDER BY id DESC` : `SELECT * FROM visits WHERE idfair=${q} AND createdBy="${z}" ORDER BY id DESC`;
            db.query(sql, (err, data) => {
                if (err) {
                    res.status(400).json({ message: err.message });
                } else {
                    res.status(200).json(data);
                }
            })
        }
    } catch (error) {
        console.error(error);
    }
})

router.post("/createvisit", async (req, res) => {
    try {

        const authorization = req.headers.authorization;
        if (authorization) {
            const sqlPost = `INSERT INTO visits (
                idfair,
                companyName, 
                referent,
                email,
                countries,
                phone,
                digital, 
                paper, 
                events, 
                notes,
                fonte,
                medio,
                createdBy
                 ) VALUES (
                    "${req.body.idfair}",
                    "${req.body.companyName}", 
                    "${req.body.referent}", 
                    "${req.body.email}",
                    "${req.body.countries}", 
                    "${req.body.phone}", 
                    "${req.body.digital}",
                    "${req.body.paper}",
                    "${req.body.events}", 
                    "${req.body.notes}",
                    "${req.body.fonte}",
                    "${req.body.medio}",
                    "${req.body.createdBy}"
                 )`


            db.query(sqlPost, (err, data) => {
                if (err) {
                    res.status(400).json({ message: err.message });
                } else {
                    res.status(200).json({
                        message: "Visit has been succesfully inserted into db!",
                        statusCode: 200
                    });
                }
            })
        }

    } catch (error) {
        console.error(error)
    }
});


router.patch("/updatevisit", async (req, res) => {
    try {
        const authorization = req.headers.authorization;

        if (authorization) {

            const sqlPatch = `UPDATE visits SET 
            
                companyName = "${req.body.companyName}", 
                referent = "${req.body.referent}", 
                email = "${req.body.email}", 
                countries = "${req.body.countries}", 
                phone = "${req.body.phone}", 
                digital = "${req.body.digital}", 
                paper = "${req.body.paper}", 
                events = "${req.body.events}", 
                notes = "${req.body.notes}",
                fonte = "${req.body.fonte}",
                medio = "${req.body.medio}",
                updatedBy = "${req.body.updatedBy}"
    
                WHERE id=${req.body.id}`


            db.query(sqlPatch, (err, data) => {
                if (err) {
                    res.status(400).json({ message: err.message });
                } else {
                    res.status(200).json({
                        message: "Visit has been succesfully updated!",
                        statusCode: 200
                    });
                }
            })
        }

    } catch (error) {
        console.error(error)
    }
});

router.delete("/deletevisit", (req, res) => {
    try {
        const q = req.query.id;
        const authorization = req.headers.authorization;
        if (authorization) {

            const sqlDel = `DELETE FROM visits WHERE id=${q};`
            db.query(sqlDel, (err, data) => {
                if (err) {
                    res.status(400).json({ message: err.message });
                } else {
                    res.status(200).json({ message: "Visit succesfully deleted!" });
                }
            })
        }
    } catch (error) {
        console.error(error)
    }
})

export default router
import db from "../db.js";
import express from "express";
const router = express.Router();

router.get("/allfairs", (req, res) => {
    try {
        const authorization = req.headers.authorization;

        if(authorization){
            const sql = "SELECT * FROM fairs";
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

router.post("/createfair", async (req, res) => {
    try {
        const authorization = req.headers.authorization;

        if(authorization){

            const sqlPost = `INSERT INTO fairs (
                eventName, 
                year, 
                date, 
                stand, 
                positionRate, 
                prevEditionRate, 
                materialDistribution,
                problems,
                comments,
                generalRate,
                notes,
                partecipants,
                createdBy
                 ) VALUES (
                    "${req.body.eventName}", 
                    "${req.body.year}",
                    "${req.body.date}",
                    "${req.body.stand}", 
                    "${req.body.positionRate}",
                    "${req.body.prevEditionRate}",
                    "${req.body.materialDistribution}", 
                    "${req.body.problems}",
                    "${req.body.comments}",
                    "${req.body.generalRate}", 
                    "${req.body.notes}",
                    "${req.body.partecipants}",
                    "${req.body.createdBy}"
                 )`
    
    
            db.query(sqlPost, (err, data) => {
                if (err) {
                    res.status(400).json({ message: err.message });
                } else {
                    res.status(200).json({
                        message: "Fair has been succesfully inserted into db!",
                        statusCode: 200
                    });
                }
            })
        }

    } catch (error) {
        console.error(error)
    }
});


router.patch("/updatefair", async (req, res) => {
    try {
        const authorization = req.headers.authorization;

        if(authorization){

            const sqlPatch = `UPDATE fairs SET 
            
                eventName = "${req.body.eventName}", 
                year = "${req.body.year}", 
                date = "${req.body.date}", 
                stand = "${req.body.stand}", 
                positionRate = "${req.body.positionRate}", 
                prevEditionRate = "${req.body.prevEditionRate}", 
                materialDistribution = "${req.body.materialDistribution}",
                problems = "${req.body.problems}",
                comments = "${req.body.comments}",
                generalRate = "${req.body.generalRate}",
                notes = "${req.body.notes}",
                partecipants = "${req.body.partecipants}",
                visitsCompleted = "${req.body.visitsCompleted}",
                databaseCompleted = "${req.body.databaseCompleted}",
                updatedBy = "${req.body.updatedBy}"
    
                WHERE id=${req.body.id}`
    
    
            db.query(sqlPatch, (err, data) => {
                if (err) {
                    res.status(400).json({ message: err.message });
                } else {
                    res.status(200).json({
                        message: "Fair has been succesfully updated!",
                        statusCode: 200
                    });
                }
            })
        }

    } catch (error) {
        console.error(error)
    }
})

export default router
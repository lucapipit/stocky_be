import express from "express";
import db from "../db.js";
import jwt from "jsonwebtoken";
const router = express.Router();

router.get('/allusers', async (req, res) => {
    try {
        const authorization = req.headers.authorization;
        if (authorization) {
            const q = 'SELECT email FROM users_active'
            db.query(q, async (err, data) => {
                if (err) {
                    res.status(400).json({ message: err.message });
                } else {
                    res.status(200).json(data);
                }
            })
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post('/signin', async (req, res) => {
    try {
        const sameEmailNum = `SELECT email FROM users_active WHERE email="${req.body.email}"`;

        db.query(sameEmailNum, async (err, data) => {
            if (err) {
                console.log("Error: ", err, ". An error occurred");
            } else {

                if (data.length === 0) {

                    const sqlPost = `INSERT INTO users_active SET 
            
                        companyName = "${req.body.companyName}", 
                        email = "${req.body.email}", 
                        pssw = "${req.body.pssw}", 
                        country = "${req.body.country}", 
                        address = "${req.body.address}", 
                        city = "${req.body.city}", 
                        zipCode = "${req.body.zipCode}", 
                        phone = "${req.body.phone}", 
                        manufacturer = "${req.body.manufacturer}",
                        dealer = "${req.body.dealer}",`

                    db.query(sqlPost, (err, data) => {
                        if (err) {
                            console.log("Error: ", err, ". An error occurred");
                            res.status(400).json({ message: err.message });
                        } else {
                            console.log("Succesfully insert into db!");
                            res.status(200).json({ message: "User succesfully created" });
                        }
                    })

                } else {
                    res.status(401).json({ message: "pssw already exists!", statusCode: 401 });
                };
            }
        })

    } catch (error) {
        console.error(error)
    }
}
);

router.post('/login', async (req, res) => {
    try {
        const inputPssw = req.body.pssw;
        const sameEmailNum = `SELECT email FROM users_active WHERE email="${req.body.email}"`;
        db.query(sameEmailNum, (err, data) => {
            if (err) {
                console.log("Error: ", err, ". An error occurred");
            } else {
                if (data.length === 1) {
                    const userPssw = `SELECT pssw FROM users_active WHERE email="${req.body.email}"`;
                    db.query(userPssw, async (err, data2) => {
                        if (err) {
                            console.log("Error: ", err, ". An error occurred");
                        } else {
                            if (inputPssw !== data2[0].pssw) {
                                res.status(401).json({ message: "Credential are not correct!", statusCode: 401 });
                            } else {
                                const token = jwt.sign({ email: data[0].email }, process.env.JWT_SECRET, { expiresIn: "24h" });
                                res.header("Authorization", token).status(200).send({
                                    statusCode: 200,
                                    token,
                                    message: "Succesfully login!"
                                })
                            }
                        }
                    })
                } else {
                    res.status(401).json({ message: "Credential are not correct!", statusCode: 401 });
                }
            }
        })
    } catch (error) {
        console.error(error)
    }
});

export default router;
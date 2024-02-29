import express from "express";
import db from "../db.js";
import jwt from "jsonwebtoken";
import loginAuth from "../middlewares/loginAuth.js";
import signinAuth from "../middlewares/signinAuth.js";
const router = express.Router();
import bcrypt from "bcryptjs";

router.get('/allusers', async (req, res) => {
    try {
        const authorization = req.headers.authorization;
        if (authorization) {
            const q = 'SELECT email FROM users_active'
            db.query(q, async (err, data) => {
                if (err) {
                    res.status(400).json({ message: err.message, statusCode: 400 });
                } else {
                    res.status(200).json(data);
                }
            })
        }
    } catch (error) {
        res.status(400).json({ message: error.message, statusCode: 400 });
    }
});

router.get('/users/:id', async (req, res) => {
    try {
        const authorization = req.headers.authorization;
        if (authorization) {
            const q = `SELECT * FROM users_active WHERE id=${req.params.id}`
            db.query(q, async (err, data) => {
                if (err) {
                    res.status(400).json({ message: err.message, statusCode: 400 });
                } else {
                    res.status(200).json(data);
                }
            })
        }
    } catch (error) {
        res.status(400).json({ message: error.message, statusCode: 400 });
    }
});

router.post('/signin', signinAuth, async (req, res) => {
    try {
        const sameEmailNum = `SELECT email FROM users_active WHERE email="${req.body.email}"`;

        db.query(sameEmailNum, async (err, data) => {
            if (err) {
                console.log("Error: ", err, ". An error occurred");
            } else {

                if (data.length === 0) {
                      // Crittografa la password prima di salvarla nel database
                      const hashedPassword = await bcrypt.hash(req.body.pssw, 10); // 10 è il costo del lavoro


                    const sqlPost = `INSERT INTO users_active (
                            companyName,
                            email,
                            pssw,
                            country,
                            address,
                            city,
                            zipCode,
                            phone,
                            manufacturer,
                            dealer,
                            interests
                            )VALUES (
                            "${req.body.companyName}", 
                            "${req.body.email}", 
                            "${hashedPassword}", 
                            "${req.body.country}", 
                            "${req.body.address}", 
                            "${req.body.city}", 
                            "${req.body.zipCode}", 
                            "${req.body.phone}", 
                            "${req.body.manufacturer}", 
                            "${req.body.dealer}",
                            "${req.body.interests}")`;

                    db.query(sqlPost, (err, data) => {
                        if (err) {
                            console.log("Error: ", err, ". An error occurred");
                            res.status(400).json({ message: err.message, statusCode: 400 });
                        } else {
                            console.log("Succesfully insert into db!");
                            res.status(200).json({ message: "User succesfully created", statusCode: 200 });
                        }
                    })

                } else {
                    res.status(401).json({ message: "user already exists!", statusCode: 401 });
                };
            }
        })

    } catch (error) {
        console.error(error)
    }
}
);

router.post('/login', loginAuth, async (req, res) => {

   

    try {
        const inputPssw = req.body.pssw;
        const sameEmailNum = `SELECT email FROM users_active WHERE email="${req.body.email}"`;
        db.query(sameEmailNum, (err, data) => {
            if (err) {
                console.log("Error: ", err, ". An error occurred");
            } else {
                if (data.length === 1) {
                    const psswIdAndInterests = `SELECT pssw, id, interests FROM users_active WHERE email="${req.body.email}"`;
                    db.query(psswIdAndInterests, async (err, data2) => {
                        if (err) {
                            console.log("Error: ", err, ". An error occurred");
                        } else {
                            if (data2.length === 1) {
                                const hashedPassword = data2[0].pssw;
                                bcrypt.compare(inputPssw, hashedPassword, (err, result) => {
                                    if (err || !result) {
                                        res.status(401).json({ message: "Credentials are not correct!", statusCode: 401 });
                                    } else {
                                        const token = jwt.sign({ email: data[0].email, id: data2[0].id, interests: data2[0].interests }, process.env.JWT_SECRET, { expiresIn: "24h" });
                                        res.header("Authorization", token).status(200).send({
                                            statusCode: 200,
                                            token,
                                            message: "Successfully logged in!"
                                        });
                                    }
                                });
                            } else {
                                res.status(401).json({ message: "Credentials are not correct!", statusCode: 401 });
                            }
                        }
                    });
                } else {
                    res.status(401).json({ message: "Credentials are not correct!", statusCode: 401 });
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
    

    
 });

router.patch('/editaccount', async (req, res) => {
    try {
        const authorization = req.headers.authorization;
        if (authorization) {
            const sqlPost = `UPDATE users_active SET
                        companyName = "${req.body.companyName}", 
                        country = "${req.body.country}", 
                        address = "${req.body.address}", 
                        city = "${req.body.city}", 
                        zipCode = "${req.body.zipCode}", 
                        phone = "${req.body.phone}", 
                        manufacturer = "${req.body.manufacturer}",
                        dealer = "${req.body.dealer}",
                        interests = "${req.body.interests}"
                        WHERE 
                        id=${req.body.id}`;

            db.query(sqlPost, (err, data) => {
                if (err) {
                    console.log("Error: ", err, ". An error occurred");
                    res.status(400).json({ message: err.message });
                } else {
                    console.log("Succesfully insert into db!");
                    res.status(200).json({ message: "Account succesfully updated" });
                }
            })
        }


    } catch (error) {
        console.error(error)
    }
}
);


export default router;
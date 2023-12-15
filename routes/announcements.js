import express from "express";
import db from "../db.js";
import jwt from "jsonwebtoken";
const router = express.Router();


router.get('/allannouncements', async (req, res) => {
    try {
        const q = "SELECT * FROM announcements";
        db.query(q, (err, data) => {
            if (err) {
                res.status(400).json({ message: err.message });
            } else {
                res.status(200).json(data);
            }
        })
    } catch (error) {
        console.error(error);
    }
});

router.post('/createannouncement', async (req, res) => {
    try {
        const sqlPost = `INSERT INTO announcements 
        (IdOwner,BrandName,ManufacturerName,ModelName, ProductSize, Description, TechnicalDetails,Pictures,Categoria, Price, Quantity,ExpirationRange,DataIns,DataMod) 
       
        VALUES ('${req.body.IdOwner}', '${req.body.BrandName}', '${req.body.ManufacturerName}', '${req.body.ModelName}', '${req.body.ProductSize}', 
        '${req.body.Description}', '${req.body.TechnicalDetails}', '${req.body.Pictures}', '${req.body.Categoria}', '${req.body.Price}', '${req.body.Quantity}', '${req.body.ExpirationRange}', '${req.body.DataIns}', '${req.body.DataMod}')`
        db.query(sqlPost, (err, data) => {
            if (err) {
                console.log("Error: ", err, ". An error occurred");
                res.status(400).json({ message: err.message });
            } else {
                console.log("Succesfully insert into db!");
                res.status(200).json({ message: "Annuncio succesfully created" });
            }
        })
    } catch (error) {
        console.error(error)
    }
}
);

router.delete('/deleteannouncement', async (req, res) => {
    try {
        const sqlPost = `DELETE FROM announcements WHERE id = '${req.body.id}'`
        db.query(sqlPost, (err, data) => {
            if (err) {
                console.log("Error: ", err, ". An error occurred");
                res.status(400).json({ message: err.message });
            } else {
                console.log("Succesfully delete from db!");
                res.status(200).json({ message: "Annuncio succesfully deleted" });
            }
        })
    } catch (error) {
        console.error(error)
    }
}
);

router.put('/updateannouncement', async (req, res) => {
    try {
        const sqlPost = `UPDATE announcements SET BrandName = '${req.body.BrandName}', ManufacturerName = '${req.body.ManufacturerName}', ModelName = '${req.body.ModelName}', ProductSize = '${req.body.ProductSize}', Description = '${req.body.Description}', 
        TechnicalDetails = '${req.body.TechnicalDetails}', Pictures = '${req.body.Pictures}', Categoria = '${req.body.Categoria}', Price = '${req.body.Price}', Quantity = '${req.body.Quantity}', ExpirationRange = '${req.body.ExpirationRange}',
         DataMod = '${req.body.DataMod}' WHERE id = '${req.body.id}'`

        db.query(sqlPost, (err, data) => {
            if (err) {
                console.log("Error: ", err, ". An error occurred");
                res.status(400).json({ message: err.message });
            } else {
                console.log("Succesfully update db!");
                res.status(200).json({ message: "Annuncio succesfully updated" });
            }
        })
    } catch (error) {
        console.error(error)
    }
}
);

router.get('/announcement/:id', async (req, res) => {
    try {
        const authorization = req.headers.authorization;
        if (authorization) {
            const q = `SELECT * FROM announcements WHERE id = '${req.params.id}'`
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
}
);

export default router;



import React from 'react'
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');



router.get('/allAnnunci',async (req, res) => {
    const authorization = req.headers.authorization;
    if (authorization) {
        const q = 'SELECT * FROM annunci'
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

router.post('/createAnnuncio',async (req, res) => {
    try {
        const sqlPost = `INSERT INTO annunci 
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

router.delete('/deleteAnnuncio',async (req, res) => {
    try {
        const sqlPost = `DELETE FROM annunci WHERE IdAnnuncio = '${req.body.IdAnnuncio}'`
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

router.put('/updateAnnuncio',async (req, res) => {
    try {
        const sqlPost = `UPDATE annunci SET BrandName = '${req.body.BrandName}', ManufacturerName = '${req.body.ManufacturerName}', ModelName = '${req.body.ModelName}', ProductSize = '${req.body.ProductSize}', Description = '${req.body.Description}', 
        TechnicalDetails = '${req.body.TechnicalDetails}', Pictures = '${req.body.Pictures}', Categoria = '${req.body.Categoria}', Price = '${req.body.Price}', Quantity = '${req.body.Quantity}', ExpirationRange = '${req.body.ExpirationRange}',
         DataMod = '${req.body.DataMod}' WHERE IdAnnuncio = '${req.body.IdAnnuncio}'`
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

router.get('/annuncio/:id',async (req, res) => {
    try {
        const authorization = req.headers.authorization;
        if (authorization) {
            const q = `SELECT * FROM annunci WHERE IdAnnuncio = '${req.params.id}'`
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

module.exports = router;



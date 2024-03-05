import express from "express";
import db from "../db.js";

import formAnnouncementAuth from "../middlewares/formAnnouncementAuth.js";
const router = express.Router();



router.get('/rej-allcounts', async (req, res) => {
    try {
        const q = "SELECT COUNT(*) AS mycount FROM rejected_announcements";
        db.query(q, (err, data) => {
            if (err) {
                res.status(400).json({ message: err.message });
            } else {
                res.status(200).json(data[0].mycount);
            }
        })
    } catch (error) {
        console.error(error);
    }
});

router.get('/rej-allannouncements', async (req, res) => {
    try {
        const q = "SELECT * FROM rejected_announcements";
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

router.post('/rej-createannouncement', formAnnouncementAuth, async (req, res) => {
    try {
        const sqlPost = `INSERT INTO rejected_announcements (
            idOwner,
            idPackage,
            status,
            rejReasons,
            relevance,
            brandName,
            manufacturerName,
            modelName,
            productSize,
            description,
            techDetail,
            pics,
            category,
            price,
            quantity,
            expireDate,
            textFocus,
            picsFocus,
            views,
            posClick,
            negClick)VALUES(
            '${req.body.idOwner}', 
            '${req.body.idPackage}', 
            '${req.body.status}', 
            '${req.body.rejReasons}', 
            '${req.body.relevance}', 
            '${req.body.brandName}', 
            '${req.body.manufacturerName}', 
            '${req.body.modelName}', 
            '${req.body.productSize}', 
            '${req.body.description}', 
            '${req.body.techDetail}', 
            '${req.body.pics}', 
            '${req.body.category}', 
            '${req.body.price}', 
            '${req.body.quantity}', 
            '${req.body.expireDate}', 
            '${req.body.textFocus}', 
            '${req.body.picsFocus}', 
            '${req.body.views}', 
            '${req.body.posClick}', 
            '${req.body.negClick}')`

        db.query(sqlPost, (err, data) => {
            if (err) {
                console.log("Error: ", err, ". An error occurred");
                res.status(400).json({ message: err.message, statusCode: 400 });
            } else {
                console.log("Succesfully insert into db!");
                res.status(200).json({ message: "Annuncio succesfully created", statusCode: 200 });
            }
        })
    } catch (error) {
        console.error(error)
    }
}
);

router.delete('/rej-deleteannouncement/:id', async (req, res) => {
    try {
        const sqlPost = `DELETE FROM rejected_announcements WHERE id = '${req.params.id}'`
        db.query(sqlPost, (err, data) => {
            if (err) {
                console.log("Error: ", err, ". An error occurred");
                res.status(400).json({ message: err.message, statusCode: 400 });
            } else {
                console.log("Succesfully delete from db!");
                res.status(200).json({ message: "Annuncio succesfully deleted", statusCode: 200 });
            }
        })
    } catch (error) {
        console.error(error)
    }
}
);

router.patch('/updaterej-announcement', async (req, res) => {
    try {
        const sqlPost = `UPDATE rejected_announcements SET 
        brandName = '${req.body.brandName}', 
        status = '${req.body.status}',
        manufacturerName = '${req.body.manufacturerName}', 
        modelName = '${req.body.modelName}', 
        productSize = '${req.body.productSize}', 
        description = '${req.body.description}', 
        techDetail = '${req.body.techDetail}', 
        pics = '${req.body.pics}', 
        category = '${req.body.category}', 
        price = '${req.body.price}', 
        quantity = '${req.body.quantity}', 
        expireDate = '${req.body.expireDate}',
        textFocus = '${req.body.textFocus}',
        picsFocus = '${req.body.picsFocus}' 
        WHERE 
        id = '${req.body.id}'`

        db.query(sqlPost, (err, data) => {
            if (err) {
                console.log("Error: ", err, ". An error occurred");
                res.status(400).json({ message: err.message, statusCode: 400 });
            } else {
                console.log("Succesfully update db!");
                res.status(200).json({ message: "Annuncio succesfully updated", statusCode: 200 });
            }
        })
    } catch (error) {
        console.error(error)
    }
}
);/* aggiungere il campo rejReasons */

router.get('/rej-announcement/:idowner', async (req, res) => {
    try {
        const authorization = req.headers.authorization;
        if (authorization) {
            const q = `SELECT * FROM rejected_announcements WHERE idOwner = '${req.params.idowner}'`
            db.query(q, async (err, data) => {
                if (err) {
                    res.status(400).json({ message: err.message });
                } else {
                    res.status(200).json({ message: 200, payload: data });
                }
            })
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
);


export default router;



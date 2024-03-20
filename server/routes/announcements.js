import express from "express";
import db from "../db.js";
import formAnnouncementAuth from "../middlewares/formAnnouncementAuth.js";
import multer from 'multer';
import fs from "fs";
const router = express.Router();


const internalStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, `_test${Date.now()}_$_${file.originalname.split(".")[0].replaceAll(" ", "")}.jpg`)
    }
})
const upload = multer({ storage: internalStorage })

router.post('/fileupload', /* upload.single('img') */upload.array("img", 12), async (req, res) => {
    const fileNameArray = [];
    [...Array(req.files.length)].map((el, index) => {
        /* console.log(req.files[index].size); */    //per visualizzare il peso delle immagini appena caricate sul server
        fileNameArray.push(`${req.files[index].filename}`)
    })

    try {
        res.status(200).json({ img: fileNameArray.toString() })
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "there are problems!!!"
        })
    }
})

router.delete('/del-fileupload/:idfilename', async (req, res) => {

    try {
        fs.unlink(`uploads/${req.params.idfilename}`, (err) => {
            if (err) throw err;
            console.log('path/file.txt was deleted');
        })
        res.status(200).json({ message: "Image succesfully deleted", statusCode: 200 })
    } catch (error) {
        res.status(400).send({ message: error, statusCode: 400 })
    }
})


router.get('/allcounts', async (req, res) => {
    try {
        const q = "SELECT COUNT(*) AS mycount FROM announcements";
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

router.get('/allannouncements/:type', async (req, res) => {
    try {
        const authorization = req.headers.authorization;
        if (authorization) {
            const myType = req.params.type === "0" ? "_pending" : req.params.type === "1" ? "_accepted" : req.params.type === "3" ? "_rejected" : ""
            const q = `SELECT * FROM announcements${myType}`;
            db.query(q, (err, data) => {
                if (err) {
                    res.status(400).json({ message: err.message });
                } else {
                    res.status(200).json({ statusCode: 200, data: data });
                }
            })
        }
    } catch (error) {
        console.error(error);
    }
});

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
});

router.get('/alluserannouncements/:idowner', async (req, res) => {
    try {
        const authorization = req.headers.authorization;
        if (authorization) {
            const q = `SELECT * FROM announcements WHERE idOwner = '${req.params.idowner}'`
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

router.post('/createannouncement', formAnnouncementAuth, async (req, res) => {
    try {
        const authorization = req.headers.authorization;
        if (authorization) {

            const sqlPost = `INSERT INTO announcements (
            idOwner,
            idPackage,
            status,
            relevance,
            rejReasons,
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
            '${req.body.relevance}',
            '${req.body.rejReasons}', 
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
                    res.status(400).json({ message: err.message });
                } else {
                    console.log("Succesfully insert into db!");
                    res.status(200).json({ message: "Annuncio succesfully created", statusCode: 200 });
                }
            })
        }
    } catch (error) {
        console.error(error)
    }
}
);

router.delete('/deleteannouncement/:id', async (req, res) => {
    try {
        const sqlPost = `DELETE FROM announcements WHERE id = '${req.params.id}'`
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

router.patch('/updateannouncement', async (req, res) => {
    try {
        const authorization = req.headers.authorization;
        if (authorization) {

            const sqlPost = `UPDATE announcements SET 
            idPackage = '${req.body.idPackage}', 
            status = '${req.body.status}', 
            rejReasons = '${req.body.rejReasons}', 
            relevance = '${req.body.relevance}', 
            brandName = '${req.body.brandName}', 
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
            dataApproved = '${req.body.dataApproved}',
            textFocus = '${req.body.textFocus}',
            picsFocus = '${req.body.picsFocus}' 
            WHERE 
            id = '${req.body.id}'`

            db.query(sqlPost, (err, data) => {
                if (err) {
                    console.log("Error: ", err, ". An error occurred");
                    res.status(400).json({ message: err.message });
                } else {
                    res.status(200).json({ statusCode: 200, message: "Annuncement succesfully updated" });
                }
            })
        }
    } catch (error) {
        console.error(error)
    }
}
);

router.get('/announcementsbyinterests/:interests', async (req, res) => {
    try {
        const authorization = req.headers.authorization;
        if (authorization) {
            /* const {interests} = req.query */
            const myParam = req.params.interests.split("-").map((el) => `'${el}'`).join(",");
            const q = `SELECT * FROM announcements WHERE category in (${myParam})`
            db.query(q, async (err, data) => {
                if (err) {
                    res.status(400).json({ message: err.message });
                } else {
                    res.status(200).json({ data: data, count: data.length });
                }
            })
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
);

export default router;



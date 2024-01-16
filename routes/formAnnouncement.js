import express from "express";
import db from "../db.js";
const router = express.Router();


router.post('/formAnnouncement', async (req, res) => {
    try {
        const sqlPost = `INSERT INTO announcements (
            ownerId,
            brandName,
            modelName,
            quantity,
            price,
            pics,
            description,
            category,
            subcategory,
            location,
            tags,
            interests,
        ) VALUES (
            '${req.body.ownerId}',
            '${req.body.brandName}',
            '${req.body.modelName}',
            '${req.body.quantity}',
            '${req.body.price}',
            '${req.body.pics}',
            '${req.body.description}',
            '${req.body.category}',
            '${req.body.subcategory}',
            '${req.body.location}',
            '${req.body.tags}',
            '${req.body.interests}',
        )`;
        db.query(sqlPost, (err, data) => {
            if (err) {
                res.status(400).json({ message: err.message });
            } else {
                res.status(200).json({ message: "Announcement created!" });
            }
        })
    } catch (error) {
        console.error(error);
    }
});

export default router;
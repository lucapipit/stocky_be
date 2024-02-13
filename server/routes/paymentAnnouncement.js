import express from 'express';
const router = express.Router();
import stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripeInstance = stripe(stripeSecretKey);

router.post('/payment', async (req, res) => {
    stripeInstance.charges.create(
        {
            source: req.body.tokenId,
            amount: req.body.amount,
            currency: "Euro",
        },
        (stripeErr, stripeRes) => {
            if (stripeErr) {
                res.status(500).json(stripeErr);
            } else {
                res.status(200).json(stripeRes);
            }
        }
    );
});

export default router;

import express from 'express';

const router = express.Router();


// create order

router.post('/createorder', async (req, res) => {
    try {
        const q = `INSERT INTO orders (user_id, product_id, order_date, order_status, order_price, order_quantity) VALUES (${req.body.user_id}, ${req.body.product_id}, '${req.body.order_date}', '${req.body.order_status}', ${req.body.order_price}, ${req.body.order_quantity})`;
        db.query(q, (err, data) => {
            if (err) {
                res.status(400).json({ message: err.message });
            } else {
                res.status(200).json({ message: "order created" });
            }
        })
    } catch (error) {
        console.error(error);
    }
}
);

// get all orders
router.get('/allorders', async (req, res) => {
    try{
        const q = "SELECT * FROM orders";
        db.query(q, (err, data) => {
            if(err){
                res.status(400).json({message: err.message});
            }else{
                res.status(200).json(data);
            }
        })
    }
    catch(error){
        console.error(error);
    }
}
);

// get order by id
router.get('/order/:id', async (req, res) => {
    try{
        const q = `SELECT * FROM orders WHERE order_id = ${req.params.id}`;
        db.query(q, (err, data) => {
            if(err){
                res.status(400).json({message: err.message});
            }else{
                res.status(200).json(data);
            }
        })
    }
    catch(error){
        console.error(error);
    }
}
);

// update order
router.put('/updateorder/:id', async (req, res) => {
    try{
        const q = `UPDATE orders SET user_id = ${req.body.user_id}, product_id = ${req.body.product_id}, order_date = '${req.body.order_date}', order_status = '${req.body.order_status}', order_price = ${req.body.order_price}, order_quantity = ${req.body.order_quantity} WHERE order_id = ${req.params.id}`;
        db.query(q, (err, data) => {
            if(err){
                res.status(400).json({message: err.message});
            }else{
                res.status(200).json({message: "order updated"});
            }
        })
    }
    catch(error){
        console.error(error);
    }
}
);

// delete order
router.delete('/deleteorder/:id', async (req, res) => {
    try {
        const q = `DELETE FROM orders WHERE order_id = ${req.params.id}`;
        db.query(q, (err, data) => {
            if(err){
                res.status(400).json({message: err.message});
            }else{
                res.status(200).json({message: "order deleted"});
            }
        })
    } catch (error) {
        console.error(error);
    }
}
);

    
    
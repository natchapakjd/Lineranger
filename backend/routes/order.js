const express = require("express");
const router = express.Router();
const db = require("../db");

router.get('/order', (req, res) => {
    const query = 'SELECT * FROM `order`'; // Corrected table name

    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: "Failed to fetch orders" });
        } else {
            res.json(result);
        }
    });
});

router.get('/order/:id', (req, res) => {
    const id = req.params.id
    const query = "SELECT `order`.date, product.name, `order`.quantity, `order`.total_price FROM `order` JOIN product ON `order`.p_id = product.id WHERE username = ?;" // Corrected table name

    db.query(query,[id] ,(err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: "Failed to fetch orders" });
        } else {
            res.json(result);
        }
    });
});

router.post("/order", async (req, res) => {
    const id = req.body.id
    const quantity =req.body.count
    const totalPrice= req.body.totalPrice
    const username = req.body.username
    console.log(id, quantity, totalPrice, username);

    // Start a transaction to ensure atomicity
    db.beginTransaction(function (err) {
        if (err) {
            console.log(err);
            res.status(500).json({ error: "Failed to start transaction" });
            return;
        }

        const orderQuery = 'INSERT INTO `order` (username, total_price, quantity, p_id) VALUES (?, ?, ?, ?)';
        const memberUpdateQuery = 'UPDATE member SET balance = balance - ? WHERE username = ?';
        const productUpdateQuery = 'UPDATE product SET quantity = quantity - ? WHERE id = ?';

        // Execute the order insert query
        db.query(orderQuery, [username, totalPrice, quantity, id], function (err, orderResult) {
            if (err) {
                console.log(err);
                // Rollback the transaction in case of an error
                db.rollback(function () {
                    res.status(500).json({ error: "Failed to insert order" });
                });
                return;
            }

            // Execute the member update query
            db.query(memberUpdateQuery, [totalPrice, username], function (err, memberResult) {
                if (err) {
                    console.log(err);
                    // Rollback the transaction in case of an error
                    db.rollback(function () {
                        res.status(500).json({ error: "Failed to update member balance" });
                    });
                    return;
                }

                // Execute the product update query
                db.query(productUpdateQuery, [quantity, id], function (err, productResult) {
                    if (err) {
                        console.log(err);
                        // Rollback the transaction in case of an error
                        db.rollback(function () {
                            res.status(500).json({ error: "Failed to update product quantity" });
                        });
                        return;
                    }

                    // Commit the transaction if all queries are successful
                    db.commit(function (err) {
                        if (err) {
                            console.log(err);
                            res.status(500).json({ error: "Failed to commit transaction" });
                        } else {
                            res.json({ message: "Order inserted successfully" });
                        }
                    });
                });
            });
        });
    });
});


module.exports = router;

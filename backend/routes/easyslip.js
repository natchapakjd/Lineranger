const express = require("express");
const router = express.Router();
const db = require("../db");

router.put("/topup/:id", (req, res) => {
  const topupAmount = req.body.balance;
  const username = req.params.id;
  const tranRef = req.body.transRef;  // Assuming the transaction reference is sent in the request body

  // Step 1: Check if tran_ref already exists in the transaction table
  const checkTransactionQuery = "SELECT * FROM transaction WHERE tran_ref = ?";
  db.query(checkTransactionQuery, [tranRef], (checkErr, checkResult) => {
    if (checkErr) {
      console.error("Error checking transaction: " + checkErr);
      res.status(500).json({ error: "Failed to check transaction" });
    } else {
      // If the transaction reference already exists, return an error
      if (checkResult.length > 0) {
        res.status(400).json({ error: "Transaction reference already exists" });
      } else {
        // Step 2: Update member's balance and insert a new record into the transaction table
        const getBalanceQuery = "SELECT balance FROM member WHERE username = ?";
        db.query(getBalanceQuery, [username], (balanceErr, balanceResult) => {
          if (balanceErr) {
            console.error("Error getting member balance: " + balanceErr);
            res.status(500).json({ error: "Failed to get member balance" });
          } else {
            const currentBalance = balanceResult[0].balance;
            const newBalance = currentBalance + topupAmount;

            // Update member's balance
            const updateBalanceQuery = "UPDATE member SET balance = ? WHERE username = ?";
            db.query(updateBalanceQuery, [newBalance, username], (updateErr, updateResult) => {
              if (updateErr) {
                console.error("Error updating member balance: " + updateErr);
                res.status(500).json({ error: "Failed to update member balance" });
              } else {
                // Insert a new record into the transaction table
                const insertTransactionQuery = "INSERT INTO transaction (tran_ref, username,amount) VALUES (?,?,?)";
                db.query(insertTransactionQuery, [tranRef, username,topupAmount], (insertErr, insertResult) => {
                  if (insertErr) {
                    console.error("Error inserting transaction: " + insertErr);
                    res.status(500).json({ error: "Failed to insert transaction" });
                  } else {
                    res.json({
                      message: "Member balance updated successfully, transaction recorded",
                      affectedRows: updateResult.affectedRows,
                      newBalance: newBalance,
                    });
                  }
                });
              }
            });
          }
        });
      }
    }
  });
});




module.exports = router;

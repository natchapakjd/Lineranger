const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/transaction", (req, res) => {
  const query = "SELECT * FROM  transaction ";

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching job types: " + err);
      res.status(500).json({ error: "Failed to fetch transactio" });
    } else {
      res.json(result);
    }
  });
});

router.post("/transaction/:id", (req, res) => {
  const id = req.params.id
  const query = "SELECT SUM(amount) as amount, CONVERT_TZ(date,'+00:00','+07:00') as date FROM  transaction WHERE  username = ?";

  db.query(query,[id] ,(err, result) => {
    if (err) {
      console.error("Error fetching job types: " + err);
      res.status(500).json({ error: "Failed to fetch transaction" });
    } else {
      res.json(result);
    }
  });
});



router.get("/transaction/:id", (req, res) => {
    const id = req.params.id
    const query = "SELECT * FROM  transaction WHERE  username = ?";
  
    db.query(query,[id] ,(err, result) => {
      if (err) {
        console.error("Error fetching job types: " + err);
        res.status(500).json({ error: "Failed to fetch transaction" });
      } else {
        res.json(result);
      }
    });
  });
module.exports = router;
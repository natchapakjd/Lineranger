const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/member", (req, res) => {
  const query = "SELECT * FROM  member ";

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching job types: " + err);
      res.status(500).json({ error: "Failed to fetch member" });
    } else {
      res.json(result);
    }
  });
});

router.get("/member/:id", (req, res) => {
  const id = req.params.id
  const query = "SELECT * FROM  member WHERE  username = ?";

  db.query(query,[id] ,(err, result) => {
    if (err) {
      console.error("Error fetching job types: " + err);
      res.status(500).json({ error: "Failed to fetch member" });
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
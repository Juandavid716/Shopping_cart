const express = require("express");
const routes = express.Router();

routes.get("/", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query("SELECT * FROM product", (err, rows) => {
      if (err) return res.send(err);

      res.json(rows);
    });
  });
});

routes.post("/", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query("INSERT INTO product set ?", [req.body], (err, rows) => {
      if (err) return res.send(err);

      res.send("product added");
    });
  });
});

routes.delete("/:id", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query(
      "DELETE FROM product WHERE _id = ?",
      [req.params.id],
      (err, rows) => {
        if (err) return res.send(err);

        res.send("product deleted");
      }
    );
  });
});

module.exports = routes;

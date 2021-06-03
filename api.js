const express = require("express");
const app = express();
const mysql = require("mysql");
const myconn = require("express-myconnection");
const routesProducts = require("./routesProducts");
const routeOrders = require("./routesOrders");

const dbOptions = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "prueba",
  database: "prueba",
};
// middlewares
app.use(myconn(mysql, dbOptions, "single"));
app.use(express.json());

// Routes

app.use("/products", routesProducts);
app.use("/order", routeOrders);
// Server running
app.listen(5000, (req, res) => {
  console.log("SERVER RUNNING");
});

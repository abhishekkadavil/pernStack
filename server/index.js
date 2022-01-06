const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body

//Routes

//login
app.use("/auth",require("./routes/jwtAuth"));

//dashboard
app.use("/dashboard", require("./routes/dashboard"));


app.listen(5000,() => {
    console.log("Server started on 5000");
});
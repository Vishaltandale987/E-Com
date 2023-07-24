const express = require("express")
const { connection } = require("./config/db");
require("dotenv").config();
const cors = require("cors");
const { ProductsRoute } = require("./routes/Product.route");


const app = express()
app.use(express.json())
app.use(cors());


app.use("/products", ProductsRoute);

app.listen(process.env.port, async () => {
    try {
      await connection;
      console.log("connected to the db");
    } catch (error) {
      console.log(error);
    }
    console.log(`server running on ${process.env.port} `);
  });
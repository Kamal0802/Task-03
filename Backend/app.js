const express = require("express");

const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const cors=require("cors")

const userRouter = require("./routes/user.router");

const productRouter = require("./routes/product.router");

const cartRouter = require("./routes/cart.router");

 const orderRouter = require("./routes/order.router")

require("dotenv").config();

const app = express();

const port = process.env.PORT;

app.use(bodyParser.json());

app.use(cors())


app.use("/api/users", userRouter);

app.use("/api/product", productRouter);

app.use("/api/cart", cartRouter);

app.use("/api/order",orderRouter);

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("DATABASE CONNECTION SUCCESSFULL !");

  app.listen(port, () => {
    console.log("SERVER IS RUNNING");
  });
});

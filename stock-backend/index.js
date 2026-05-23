const express = require("express");
const cors = require("cors");
const { connectDb } = require("./db");
const { Stock } = require("./models/Stock");
const { User } = require("./models/User");
const jwt = require("jsonwebtoken");
const app = express(); //app configuration
require("dotenv").config();
// mongodb://localhost:27017/stock-db and mongoose

connectDb();

// cors -> cross origin resource sharing
app.use(cors());
app.use(express.json());

// http://localhost:8000/stocks  -> this is our get api to fetch the stocks

// request -> comes from frontend or client
// response -> goes to frontent from the backend server
app.get("/stocks", async (req, res) => {
  try {
    console.log(req.headers.authorization);

    if (req.headers.authorization) {
      let allStocksData = await Stock.find();

      res.status(200).send(allStocksData);
    } else {
      res.status(401).send("Not Authenticated");
    }
  } catch (error) {
    res.send({ message: error.message });
  }
});

// try catch -> we can handle the
app.post("/stock-create", async (req, res) => {
  try {
    console.log(req.body);
    const stockData = await Stock(req.body);
    await stockData.save();
    res.status(201).send({ sucess: "Stock is created" });
  } catch (error) {
    res.send({ message: error.message });
  }
});

app.delete("/stock-delete", async (req, res) => {
  try {
    let stockId = req.body.stockId;
    let response = await Stock.findByIdAndDelete(stockId);
    console.log(response);
    res.status(200).send("Deleted Successfully");
  } catch (error) {
    res.send({ message: error.message });
  }
});

app.post("/signup", async (req, res) => {
  try {
    const emailText = req.body.email;
    const storedUser = await User.findOne({ email: emailText });
    if (storedUser) {
      return res.status(400).send("User account already exists");
    } else {
      const userObj = await User(req.body);
      await userObj.save();
      return res.status(201).send("User account created successfully");
    }
  } catch (error) {
    res.send({ message: error.message });
  }
});

app.post("/login", async (req, res) => {
  console.log(req.body);
  let emailText = req.body.email;
  let storedUser = await User.findOne({ email: emailText });
  if (!storedUser) {
    return res.status(400).send("Email does not exist");
  } else {
    if (storedUser.password !== req.body.password) {
      return res.status(400).send("Password Does not match");
    }

    const token = jwt.sign(
      { userId: storedUser._id, userEmail: storedUser.email },
      "SECRET",
    );
    console.log(token);
    return res.send(token);
  }
});
// app.post();
// app.delete();
// app.put();

app.listen(8000, () => {
  console.log("Server listening on port 8000");
});

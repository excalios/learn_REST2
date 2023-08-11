require("dotenv").config();

const express = require("express");
const cors = require("cors");
const createError = require("http-errors");

const authRouter = require('./route/authRoute')
const userInfoRouter = require('./route/userInfoRoute')
const ewalletRouter = require('./route/ewalletRoute')

const authenticated = require('./middleware/authenticated')


const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use('/user/auth', authRouter)

// middleware for auth
app.use(authenticated)
app.use('/user/', userInfoRouter)
app.use('/ewallet',ewalletRouter)


// middleware error
app.use(function (req, res, next) {
  next(createError.NotFound("Halaman tidak ditemukan"));
});

app.listen(PORT, () => {
  console.log("Sever Connected on", PORT);
});

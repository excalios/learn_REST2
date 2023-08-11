require("dotenv").config();

const express = require("express");
const cors = require("cors");
const createError = require("http-errors");

const authRouter = require('./route/auth.route')
const userInfoRouter = require('./route/userInfoRoute')
const ewalletRouter = require('./route/ewalletRoute')

const authenticated = require('./middleware/authenticated')


const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
// Helmet
// Compression
// Morgan
app.use(express.json());

app.use('/auth', authRouter)

// middleware for auth
app.use(authenticated)
app.use('/user/', userInfoRouter)
app.use('/ewallet',ewalletRouter)


// middleware error
app.use(function (_req, _res, next) {
  next(createError.NotFound("Halaman tidak ditemukan"));
});

app.listen(PORT, () => {
  console.log("Server Connected on", PORT);
});
